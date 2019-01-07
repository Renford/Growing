# 准备篇

- Python: 简单明确的高级编程语言,
  1. [Python 官网](https://www.python.org),
  2. [机器学习的 Python 快速教程(Python 基础)](https://zhuanlan.zhihu.com/p/24162430),
  3. [机器学习的 Python 快速教程(matplotlib 和 numpy)](https://zhuanlan.zhihu.com/p/24309547),
  4. [机器学习的 Python 快速教程(Python-OpenCV)](https://zhuanlan.zhihu.com/p/24425116),
  5. [廖雪峰 Python 教程](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)
- Numpy: Python 的数值计算的库，提供了很多高级的数学算法和便利的数组操作方法。
  - [numpy API](https://docs.scipy.org/doc/numpy-dev/contents.html),
  - array: 数组子模块,
  - linalg: 线性代数子模块,
  - random: 随机数子模块,
- Matplotlib: Python 中最常用的可视化工具，创建海量类型地 2D 图表和一些基本的 3D 图表。,
  - [matplotlib API](https://matplotlib.org/api/index.html),
  - pyplot: 2D 图表子模块，包括点、线、柱、饼,
  - mpl_toolkits: 3D 图表子模块,
- Latex: 生成复杂表格和数学公式。,
  - [LaTex 官网](https://www.latex-project.org),
  - [常用数学符号的 LaTeX 表示方法](http://www.mohu.org/info/symbols/symbols.htm),
- Jupyter: 一种可读性分析的工具，可以添加代码、图像、注释、公式等,
  - [jupyter 官网](http://jupyter.org),
  - [jupyter 小技巧](http://liuchengxu.org/pelican-blog/jupyter-notebook-tips.html),
  - [jupyter 常用快捷键](https://blog.csdn.net/lawme/article/details/51034543),
  - [Anaconda](https://www.anaconda.com/download/#macos): 一键配置 jupyter 的使用环境,

## Numpy 常用方法

- astype(): 修改返回类型，参数为未指定类型，如`y.astype(np.int)`
- maximum(): 取最大值
- random.choice: 随机选择几个数，如 np.random.choice(100, 10) 会从 0 到 99 之间随机选择 10 个数字

- 多维数组
  - dim：数组维度
  - shape：数组形状，以元祖形式返回，如二维数组，(4,3)
  - dot: 点乘，可用于矩阵相乘

## 常用函数的实现

```
import numpy as np
import matplotlib.pylab as plt

# 阶跃函数
def stepFunction(x):
    y = x > 0
    return y.astype(np.int)

# sigmod函数
def sigmoid(x):
    return 1 / (1 + np.exp(-x))

# ReLU 函数
def relu(x):
    return np.maximum(0, x)

# softmax 函数
def softmax(a):
    c = np.max(a)  # 解决溢出问题
    exp_a = np.exp(a - c)
    sum_exp_a = np.sum(exp_a)
    return exp_a / sum_exp_a

# 方差函数
def mean_squared_error(y, t):
    return 0.5 * np.sum((y-t)**2)

# 交叉熵误差
def cross_entropy_error(y, t):
    delta = 1e-7
    return -np.sum(t * np.log(y + delta))

# 真的导数
def numberical_diff(f,x):
    h = le-4
    return (f(x+h) - f(x-h)) / (2*h)
```

## 机器学习常用数据集

- MNIST 数据集：手写数字图像集

# 感知机

感知机是具有输入和输出的算法，是神经网络（深度学习）的起源的算法。

- 与门：仅在两个输入均为 1 时输出 1，其他时候则输出 0。
- 与非门：仅当两个输入均为 1 时输出 0，其他时候则输出 1。
- 或门：只要有一个输入信号是 1，输出就为 1。
- 异或门：仅当 x1 或 x2 中的一方为 1 时，才会输出 1，无法通过单层感知机来表示

# 神经网络

1. 激活函数，作用是决定如何来激活输入信号的总和

> 激活函数不能使用线性函数

- 阶跃函数
- sigmoid（sigmoid function）函数：连续函数
- ReLU（Rectified Linear Unit）函数：小于 0 为 0，大于 0 为连续函数

2. 矩阵相乘

矩阵的乘积是通过左边矩阵的行（横向）和右边矩阵的列（纵向）以对应元素的方式相乘后再求和而得到的。如 3 × 2 的矩阵 A 和 2 × 4 的矩阵 B 的乘积运算生成了 3 × 4 的矩阵 C

3. 神经网络

机器学习的问题大致可以分为分类问题和回归问题，需要根据情况改变输出层的激活函数。神经网络各层的运算是通过矩阵的乘法运算打包进行的。

> 一般而言，在输出层的选择上，回归问题用恒等函数，分类问题用 softmax 函数，二分问题用 simoid 函数。

- 恒等函数：将输入按原样输出
- softmax 函数：输出是 0.0 到 1.0 之间的实数，且 softmax 函数的输出值的总和是 1

4. 识别手写数字

求解机器学习的问题一般分为学习和推理两个阶段：学习就是使用训练数据、调整参数的过程；推理解阶段，就是用学到的模型对未知数据进行推理。

# 神经网络的学习

学习指从训练数据中自动获取最优权重参数的过程。学习的目的就是以该损失函数为基准，找出能使它的值达到最小的权重参数。

- 泛化能力：处理未被观察过的数据的能力，是机器学习的最终目标
- 损失函数：表示神经网络性能的“恶劣程度”。可使用任意函数，一般使用方差函数和交叉熵误差

![方差函数](http://private.codecogs.com/gif.latex?E=\frac{1}{2}\sum_k(y_k-t_k%29^2\quad\quad\quad\quad\quad(4.1%29)

![交叉熵误差](http://private.codecogs.com/gif.latex?E=-\sum_kt_k\log%20y_k\quad\quad\quad\quad\quad(4.2%29)

> 在进行神经网络的学习时，不能将识别精度作为指标。因为如果以识别精度为指标，则参数的导数在绝大多数地方都会变为 0。其中、损失函数是连续的，识别精度是离散的。

- 真的导数：基于数学公式推到求出的导数
- 数值微分：利用微小的积分求导数的过程
