# nodeapp

自定义的nodejs express项目，包含了mysql 数据库连接等一些操作，页面相对简单，功能已经实现。

#配置当前的环境 develop:开发环境  production：生产环境
#export NODE_ENV=develop
export NODE_ENV=production

#配置端口号
npm config set nodeapp:port 8080


#配置debug工具
采用的是node inspector

（1）安装 npm install node-inspector -g

（2）项目根目录下输入node-inspector命令

（3）项目根目录下另开一个命令窗口npm start。（只针对本项目）

