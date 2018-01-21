## 安装

mysql: https://dev.mysql.com/downloads/mysql/
可视化工具: https://dev.mysql.com/downloads/workbench/

## 基本操作

1、终端创建数据库

> mysql -u root -p
> CREATE DATABASE 库名;// ';'必须可少

2、Sequlize定义model调用sync自动同步表头

> sequlize.sync();

## 重置root密码

1、停止 mysql server 

> '系统偏好设置' > MySQL > 'Stop MySQL Server'

2、打开终端，输入命令，进入安全模式

> sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables

3、新开一个终端，输入以下命令

> sudo /usr/local/mysql/bin/mysql -u root
> UPDATE mysql.user SET authentication_string=PASSWORD('新密码') WHERE User='root';
> FLUSH PRIVILEGES;
> \q

4、重启mysql