# 指定我们的基础镜像是node，版本是v8.0.0
 FROM node:8.0.0
 # 指定制作我们的镜像的联系人信息（镜像创建者）
 MAINTAINER ldz
 
 # 文件复制。将当前目录下内容全部复制到container的app下。
 #ADD . /app/
# 设定工作目录，即接下来执行命令都是在该目录中进行。
 WORKDIR /app
 
 # 安装项目依赖包
 RUN npm install
 RUN npm rebuild node-sass --force
 
 # 配置环境变量
 ENV HOST 0.0.0.0
 ENV PORT 3000
 
 # 容器对外暴露的端口号
 EXPOSE 3000
 
 # 容器启动时执行的命令，类似npm run start, 
 # 没有ENTRYPOINT时，最后一个会作用ENTRYPOINT。有多个CMD时，只有最后一个有效。 外部执行时container，传递command会覆盖掉CMD。
#  CMD ["npm", "start"] 
# 入口点，完全不可以覆盖。
ENTRYPOINT [ "npm", "start" ]

# 构建container
# docker build -t express_node .
# 启动contaienr， 将当前目录的内容全部映射到container的/app/下
# docker run -d -p 3001:3000 -v $PWD:/app/ --name express_npm express_node