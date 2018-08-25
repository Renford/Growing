# iOS

## 1、 内存泄漏和野指针的区别

+ 内存泄漏：一般指堆内存的泄漏，用动态存储分配函数动态开辟的空间，在使用完毕后未释放，结果导致一直占据该内存单元。
+ 野指针：指向“垃圾”内存的指针，一般造成原因：
  1. 指针变量没有被初始化
  2. 指针p被free或者delete之后，没有置为NULL
  3. 野指针指针操作超越变量作用域

## 2、property后的关键字相关，注意copy


## 3、block用什么修饰

用copy，strong修饰block在ARC和MRC都是可以的，都是在堆区

MRC：Block的内存地址显示在栈区,栈区的特点就是创建的对象随时可能被销毁,一旦被销毁后续再次调用空对象就可能会造成程序崩溃,在对block进行copy后,block存放在堆区.所以在使用Block属性时使用copy修饰。
ARC：Block都会在堆上的，系统会默认对Block进行copy操作

> 1. _NSConcreteGlobalBlock 全局的静态 block，不会访问外部局部变量
> 2. _NSConcreteStackBlock 保存在栈中的 block，当函数返回时会被销毁
> 3. _NSConcreteMallocBlock 保存在堆中的 block，当引用计数为 0 时会被销毁

## 4、NSString 和 NSArray用strong修饰会有什么问题

当一个对象的某个属性的类型存在可变子类时, 赋值给该属性的对象，如果是可变的（NSMutableString、NSMutableArray），修改该对象的值，会影响到这个属性的值。因为strong修饰的属性并不会开辟新的内存，而是直接强引用已有的内存

```
NSMutableString *tempName = [[NSMutableString alloc] initWithString:@"Hello"];
NSLog("1、tempName=======%@======%p", tempName, tempName)

Person *person = [[Person alloc] init];
person.name = tempName;
NSLog("person.name=======%@======%p", person.name, person.name)

[tempName appendString:@"----World!"];
NSLog("person.name=======%@======%p", person.name, person.name)
```

## 5、iOS的内存管理机制

ARC下
  1. assgin : 基本数据类型、枚举、结构体（非OC对象）
  2. strong : 除NSString\block以外的OC对象
  3. copy : NSString，数组，字典，block
  4. weak : 当2个对象相互引用，一端用strong，一端用weak。引用记数不会加1

非ARC下
  1. assign，用于基本数据类型和C数据类型（int, float, double, char)另外还有id
  2. retain，通常用于非字符串对象
  3. copy，通常用于字符串对象、block、NSArray、NSDictionary

retain、copy、assign的区别
  1. retain：当对一个对象A调用retain，然后赋值给B时，对象的引用计数加1，A和B指向同一个内存地址。
  2. copy：当对一个对象A调用retain，然后赋值给B时，对象的引用计数加1，而且生成了一个新的拷贝，A和B指向不一样的内存地址。
  3. assign：当对一个对象A调用retain，然后赋值给B时，对象的引用计数不变，A和B指向同一个地址。


## 6、什么时候会出现循环引用，__weak、__strong、__block分别是什么作用

1. Delegate：使用 strong 或 retain
2. NSTimer：在dealloc中调用invalidate 造成循环引用
3. block：在block内部引用了持有block的对象

+ __weak: 强引用转弱引用，破解循环引用
+ __strong: 弱引用转强引用，防止未使用完成先释放
+ __block: block修改外边的属性

## 7、说一下autoreleasepool
autoreleasepool怎么做到释放对象的

## 8、nil Nil null NSNull的区别

+ nil：指向oc中对象的空指针，针对对象。
+ Nil：指向oc中类的空指针，针对类。
+ NULL：指向其他类型的空指针，如一个c类型的内存指针，基本数据类型为空，基本类型。
+ NSNull：在集合对象中，表示空值的对象。

## 9、oc中调用nil的方法会返回nil或0，但有些时候有特殊情况，不是真正意义上的空/0，举例

返回struct的方法并没有走send message，走的什么
列举修饰符中，内存管理相关关键字及其作用

## 10、Category中使用@property方式添加的属性，实质是什么？支持KVO吗？

RunTime，
可以，实现NSKeyValueObServing就行，NSObject已经实现

## 11、OC调用C++ 的方式有哪些

1、创建C++文件，自动生成cpp、hpp两文件
2、hpp定义属性、方法，cpp实现方法
3、调用C++的'.m'文件改为'.mm'


runloop的理解，几种模式优先级排序
runloop是怎么实现的
isa指针是什么
meta-class是什么
NSDictionary的实现
gcd once怎么保证once
GCD串行/并行队列以及sync/async的问题
比较一下线程操作的gcd和nsoperation
OC中提供哪些可扩展的方式
动态库和静态库的区别有哪些
displaylink和timer的区别
如何自己实现timer
不用runtime中的exchange，还有什么方法能达到hook的效果
用runtime交换方法，有些情况下，可能会出问题，怎么解决的
iOS的响应链（详细过程），可以用什么方法影响到响应链

描述一下OC的编译过程

# 2、3th

## ReactiveCocoa

RAC中的冷信号和热信号是什么，有什么区别
RAC的Subject和Signal的区别
RAC中如何监听方法调用的
RAC中的RACObserver和KVO有什么区别
RAC的map和flattenMap的区别
RAC中的Reduce的作用
RAC的双向绑定怎么做到的，为什么没有引起循环引用
SDWebImage中从调接口到完成图片显示的整个过程
SDWebImage中对缓存做了哪些优化

# 3、Network
https和http的区别
上传文件的http请求包含哪些信息
https的验证证书怎么做的
描述一下https的握手过程
websocket建立时经过哪些过程
websocket断开时经过哪些过程

# 4、Algorithm
给定二叉树，写出前序、中序、后序遍历的结果
不用递归，实现二叉树的前序、中序、后序遍历
找到一个字符串最长无重复字符的子序列，你的算法复杂度是多少
什么是最大子序列问题，并求解，说出算法复杂度
动态规划算法有哪些特性
一篇文章，如何准确的计算单词个数