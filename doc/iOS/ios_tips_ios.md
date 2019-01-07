# 1、[RunLoop](https://blog.ibireme.com/2015/05/18/runloop/)

- CFRunLoopRef: 属于 CoreFoundation 框架，提供纯 C 函数的 API，这些 API 都是线程安全的
- NSRunLoop：基于 pthread，对 CFRunLoopRef 的封装，提供面向对象的 API，但这些 API 不是线程安全的。

## RunLoop 和线程的关系

线程和 RunLoop 之间是一一对应的，其关系是保存在一个全局的 Dictionary 里。线程刚创建时并没有 RunLoop，如果你不主动获取，那它一直都不会有。RunLoop 的创建是发生在第一次获取时，RunLoop 的销毁是发生在线程结束时。你只能在一个线程的内部获取其 RunLoop（主线程除外）。

## RunLoop 相关接口

一个 RunLoop 包含若干个 Mode，每个 Mode 又包含若干个 Source/Timer/Observer。每次调用 RunLoop 的主函数时，只能指定其中一个 Mode，这个 Mode 被称作 CurrentMode。如果需要切换 Mode，只能退出 Loop，再重新指定一个 Mode 进入。

![RunLoop各Api的关系](https://blog.ibireme.com/wp-content/uploads/2015/05/RunLoop_0.png)

- CFRunLoopRef
- CFRunLoopModeRef
- CFRunLoopSourceRef：事件产生的地方
  - Source0：包含了一个回调（函数指针），它并不能主动触发事件
  - Source1：包含了一个 mach_port 和一个回调（函数指针），被用于通过内核和其他线程相互发送消息，能主动唤醒 RunLoop 的线程
- CFRunLoopTimerRef：基于时间的触发器，包含一个时间长度和一个回调（函数指针）
- CFRunLoopObserverRef：观察者，每个 Observer 都包含了一个回调（函数指针）

## RunLoop 的 Mode

系统默认注册了 5 个 Mode：

- NSDefaultRunLoopMode：属于 Fundation，App 平时所处的状态
- UITrackingRunLoopMode：属于 UIKit，追踪 ScrollView 滑动时的状态，保证界面滑动时不受其他 Mode 影响
- UIInitializationRunLoopMode: 在刚启动 App 时第进入的第一个 Mode，启动完成后就不再使用。
- GSEventReceiveRunLoopMode: 接受系统事件的内部 Mode，通常用不到
- NSRunLoopCommonModes：属于 Fundation，用于标记 mode 是否具有 Commen 属性

> 应用场景举例:
> 当你创建一个 Timer 并加到 DefaultMode 时，Timer 会得到重复回调，但此时滑动一个 TableView 时，RunLoop 会将 mode 切换为 TrackingRunLoopMode，这时 Timer 就不会被回调，并且也不会影响到滑动操作。
> 如果需要一个 Timer，在两个 Mode 中都能得到回调：1、将这个 Timer 分别加入这两个 Mode；2、将 Timer 加入到顶层的 RunLoop 的 “commonModeItems” 中。”commonModeItems” 被 RunLoop 自动更新到所有具有”Common”属性的 Mode 里去

## RunLoop 的内部逻辑

![RunLoop的内部逻辑](https://blog.ibireme.com/wp-content/uploads/2015/05/RunLoop_1.png)

## RunLoop 的应用

1. AutoreleasePool: App 启动后，Apple 注册了两个 Observer，回调都是\_wrapRunLoopWithAutoreleasePoolHandler

- 一个监听进入 Loop 的事件，其回调会调用 \_objc_autoreleasePoolPush() 创建自动释放池，优先级最高，保证创建释放池发生在其他所有回调之前；
- 另一个监听 RunLoop 的退出和休眠事件，优先级最低，保证其释放池子发生在其他所有回调之后
  - 退出 Loop 的事件，其回调会调用 \_objc_autoreleasePoolPop() 释放自动释放池
  - 进入休眠状态，其回调会释放旧的自动释放池，并创建新的自动释放池

2. 事件响应：Apple 注册 Source1 来接收系统事件

- 硬件事件(触摸/锁屏/摇晃等)发生后，IOKit 生成一个 IOHIDEvent 事件
- SpringBoard 接收并过滤其中接近传感器的事件（按键、触摸、加速等）
- 由 mach port 转发给 App 进程
- 在 Apple 注册的 Source1 的毁掉中，使用 \_UIApplicationHandleEventQueue() 进行应用内分发
  - UIGesture、处理屏幕旋转发送给 UIWindow
  - 通常事件比如 UIButton 点击、touchesBegin/Move/End/Cancel 事件发给对应回调

3. 手势识别

4. 界面更新

操作 UI 时，这个 UIView/CALayer 就被标记为待处理，并被提交到一个全局的容器去。在监听 BeforeWaiting(即将进入休眠) 和 Exit (即将退出 Loop) 事件的 Observer 的毁掉中遍历所有待处理的 UIView/CALayer，并更新 UI。

5. NSTimer：即 CoreFundation 的 CFRunLoopTimerRef

- Tolerance：CFRunLoopTimerRef 可以设置 timer 的误差范围
- 错过的时间点不会延时执行，只会执行下一个
- CADisplayLink：一个和屏幕刷新率一致的定时器

6. PerformSelecter

当调用 performSelecter:afterDelay: 后，内部会创建一个 Timer 并添加到当前线程的 RunLoop 中。所以如果当前线程没有 RunLoop，则这个方法会失效。

7. GCD

当调用 dispatch_async(dispatch_get_main_queue(), block) 时，libDispatch 会向主线程的 RunLoop 发送消息，RunLoop 会被唤醒，并从消息中取得这个 block，并在回调里**CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE**()执行这个 block

8. AFNetworking

# 2、Swift vs. Objective-C

1. String，Array，Dictionary 类型不同

   - OC 为引用类型，在堆上操作，单个指针的上下移动
   - swift 为值类型，在栈上操作，牵涉到合并、移位、重新链接等，线程安全

2. init

   - OC 无法保证所有成员变量都完成初始化，编译器对属性设置并无警告，但是实际操作中会出现初始化不完全的问题
   - swift 必须保证所有 optional 的成员变量都完成初始化。

# 3、关于可变参数

1. va_list 用于声明一个变量，我们知道函数的可变参数列表其实就是一个字符串，所以 va_list 才被声明为字符型指针，这个类型用于声明一个指向参数列表的字符型指针变量，例如：va_list ap;//ap:arguement pointer
2. va_start(ap,v),它的第一个参数是指向可变参数字符串的变量，第二个参数是可变参数函数的第一个参数，通常用于指定可变参数列表中参数的个数。
3. va_arg(ap,t),它的第一个参数指向可变参数字符串的变量，第二个参数是可变参数的类型。
4. va_end(ap) 用于将存放可变参数字符串的变量清空（赋值为 NULL)。

# 4、UItableView 的优化

## 4.1 影响流畅度的主要原因

- 文本宽高计算、视图布局计算
- 文本渲染、图片解码、图形绘制
- 对象创建、对象调整、对象销毁
- 数据的转化

## 4.2 常用优化流程

1. 最基本的

- 重用
- 布局尽量减少 cell 的层级关系

2. 减少 CPU/GPU 计算量

- 缓存 cell 的 height 和 frame
- 尽量减少绘制时数据的计算
- 通过图片蒙版实现圆角效果

3. 异步处理 cell

- 异步加载网络图片
- 异步绘制本地图片
- 异步绘制 UIView
- 异步绘制 UILabel

4. 按需加载 cell

- cellForRow 只加载可见 cell
- 监听 tableview 的快速滚动，保存目标活动范围的前后三行的索引

# 5、通过 bugly 快速定位线上 crash

1. 项目集成 bugly 上传 crash
2. 每次发布备份 dsym 文件
3. 上传 dsym ，通过符号表程序堆栈进行解析和还原，快速定位 crash 的代码

# 6、UIKit

## 6.1 UIView 和 CALayer

- UIView 侧重于对显示内容的管理，CALayer 侧重于对内容的绘制。
- frame 的决定要素：
  - 一个 Layer 的 frame 是由它的 anchorPoint,position,bounds,和 transform 共同决定的
  - View 的 frame 只是简单的返回 Layer 的 frame。
- 继承结构：
  - UIView 的继承结构为: UIResponder : NSObject。UIResponder 是用来响应事件的，也就是 UIView 可以响应用户事件。
  - CALayer 的继承结构为： NSObject。直接从 NSObject 继承，因为缺少了 UIResponder 类，所以 CALayer 悲催的不能响应任何用户事件。CALayer 定义了 position、size、transform、animations 等基本属性。

## 6.2 frame 和 bounds

- frame：参考父 view 的坐标系来设置自己左上角的位置。
- bounds：设置 bounds 可以修改自己坐标系的原点位置，进而影响到其“子 view”的显示位置。

CALayer 的 frame、bounds、anchorPoint、position

```
frame: 同view的frame，用来确定sublayer在父layer的位置和大小
bounds：同view的bounds
anchorPoint：相对bounds的比例值来确定的
position：layer中的anchorPoint点在superLayer中的位置坐标.
```

anchorPoint、position、frame 之间的相对关系.

```
frame中的X,Y表示sublayer左上角相对于supLayer的左上角的距离
position中的X,Y表示sublay锚点相对于supLayer的左上角的距离
anchorPoint中的X,Y表示锚点的x,y的相对距离比例值
```

## 6.3 事件传递机制

产生事件 -> UIApplication 事件队列（FIFO） -> [UIWindow hitTest:withEvent:] -> 返回更合适的 view -> [子控件 hitTest:withEvent:] -> 返回最合适的 view - initial view。
找到合适的 view 就会调用 touches 方法来做具体的事件处理。

子视图 frame 超过父视图的部分为什么不响应，如何响应？

当点击的子 view 不在父 view 的范围内，hitTest 返回 nil，系统认为没有对象响应这个点击事件。若要响应该事件，需要重写父 View 的 hitTest 方法，当点击的点在子 view 的范围内，则返回子 view

## 6.4 UIButton 和 UITableView 的层级结构

- UIButton：UIControl：UIView：UIResponder：NSObject
  - UIButton: 主要是 button 的表现形式的设置，如 title、color 之类的
  - UIControl：主要处理 Target-Action 事件
  - UIView：对显示内容的管理
  - UIResponder：主要负责 touch 事件的响应与处理
  - NSObject：基类，定义一些公共属性和方法
- UITableview：UIScrollView：UIView：UIResponder：NSObject
  - UITableView: 主要是对 cell 的显示与管理
  - UIScrollView：主要是对滑动视图的显示与管理，对滑动事件的处理

## 6.5 Xib 的约束拖线后的属性默认为何为 weak

为了保证 view 被移除了，view 上面的控件也 nil。

事实上 IBOutlet 的属性一般可以设为 weak 是因为它已经被 view 引用了，除非 view 被释放，否则 IBOutlet 的属性也不会被释放，另外 IBOutlet 属性的生命周期和 view 应该是一致的，所以 IBOutlet 属性一般设为 weak

# 7、类与对象

## 7.1 类也是一种对象如何理解

- 对象是其所属类的实例对象，而类是其元类的实例对象；
- 对象是 objc_object 结构类型的指针，类是 objc_class 结构类型的指针，继承自 objc_object。

- 每个实例对象有个 isa 的指针, 他指向对象的类，
- 而 Class 里也有个 isa 的指针, 指向 metaClass(元类)。

- 当对一个实例发送消息时（-开头的方法），会在该 instance 对应的类的 methodLists 里查找。
- 当对一个类发送消息时（+开头的方法），会在该类的 MetaClass 的 methodLists 里查找。

## 7.2 如何判断自定义对象是否相等

自定义对象中覆写 NSObject 的 isEqual 得方法步骤：

1. 判断指针值是否相等；
2. 判断两个对象是否属于同一个类；
3. 所有字段均相等；

> 等同性约定：若两对象相等，则其哈希码（hash）也相等，但两个哈希码相同的对象却未必相等。

## 8、动画

如 push，transformation（显式隐式仅仅是针对封装方法的分类，即对象和 layer）
核心动画类中可以直接使用的类有：

- CABasicAnimation 基础动画
- CAKeyframeAnimation 关键帧动画
- CATransition 转场动画
- CAAnimationGroup 组动画
- CASpringAnimation 弹性动画

# 9、启动过程

1. 链接并加载 Framework 和静态库
   - 每个 Framework 的加载都会增加启动时间，所以必要的 Framework 不要设置成 Optional，不必要的的 Framework 不要链接；
   - 避免全局的 C++对象
2. 初始化 UIKit
   - 字体、状态栏、userdefault、main storyboard 都会被初始化，所以保持 main xib/main storyboard 要经可能的小；

- userdeault 实质是一个 plist 文件，所以不要在 userdefault 中放大文件（如一些图片、缓存数据）

3. 应用程序回掉
   - application:willFinishLaunchingWithOptions:
   - 恢复应用程序状态
   - application:didFinishLaunchingWithOptions:
4. 第一屏动画

优化启动时间：

- 减少动态库加载时间
- MainStoryboard 不宜太大
- UserDefalt 不宜太大

## 9.1 冷启动

从用户点击 App 图标到界面可操作，大致可以分为三个阶段。

- T1: 点击图标到执行 main 函数之前。操作系统加载 App 可执行文件到内存，然后执行一系列的加载&链接等工作，最后执行至 App 的 main()函数。
- T2: 从 main()开始，到 appDelegate 的 didFinishLaunchingWithOptions 方法执行完毕。
- T3: 执行 didFinishLaunchingWithOptions 到界面可操作，经过首页数据请求、页面渲染等操作
