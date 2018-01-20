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