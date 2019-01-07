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


# 均方误差
def mean_squared_error(y, t):
    return 0.5 * np.sum((y - t)**2)


# 交叉熵误差
def coss_entry_error(y, t):
    delta = 1e-7
    return -1 * np.sum(t * np.log(y + delta))


x = np.arange(-5, 5, 0.1)
y = stepFunction(x)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)
plt.show()

x = np.arange(-5, 5, 0.1)
y = sigmoid(x)

plt.plot(x, y)
plt.ylim(-0.1, 1.1)
plt.show()
