#  点存科技前端招募测试


请在 2 ~ 3 天之内完成如下的测试：

1. 从 GitHub 上 fork 本项目到你个人项目库，然后 clone 到本地；
2. 按照【备注】中的【搭建后端测试服务器】提示，搭建并运行用于测试的后端服务器；
3. 完成【备注】中的【测试项目】，并使用 Markdown 记录完成项目过程中遇到的问题，以及解决思路；
4. (可选) 在完成任务的过程中如有疑问，请在本项目的 issues 中提问；
5. 以上任务完成后，将作品提交到个人 GitHub 库，然后在 issues 中留下您的 `项目链接` + `联系方式`，如果合适，我们将主动联系您；


## 备注

### 搭建后端测试服务器

1. 下载 [redis 3.0.504](https://github.com/MicrosoftArchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.zip)，解压后从命令行运行 `redis-server.exe` 命令来启动 redis 服务器；
3. 使用命令行进入 services 目录，使用 `npm install`，安装项目依赖包；
4. 使用 `npm start` 启动服务器，看到 `Server listening on port:  5000` 表示启动成功。

### 测试项目

#### 测试一： 在 `test1` 目录下，使用 Vue.js + ES6 + webpack 组合，开发如下几个模块：

- 首页
- 博客列表：只读
- 博客详情：只读
- 注册登录

##### 页面 UI 参考：

- 【首页】参考：https://blackrockdigital.github.io/startbootstrap-modern-business/index.html
    1. 支持图片轮播
    2. 【Welcome to Modern business】 和 【 Portfolio Heading 】 博客按时间显示
- 【博客列表】参考： https://blackrockdigital.github.io/startbootstrap-modern-business/blog-home-1.html
- 【博客详情】参考： https://blackrockdigital.github.io/startbootstrap-modern-business/blog-post.html
- 【登录】 参考： https://blackrockdigital.github.io/startbootstrap-sb-admin-2/pages/login.html 需要加上导航栏
- 【注册】 可自行安排，或参考 https://bootsnipp.com/snippets/featured/simple-registration-form  需要加上导航栏

##### API接口：

- 注册：`http://127.0.0.1:5000/api/signup`
    - 方法：`POST`
    - 参数：`{ username: '', email: '', password: '' }`
    - 返回
        - 成功：`{ success: true, message: 'ok', user: { 用户信息 } }`
        - 失败：`{ success: false, message: '失败原因' }`

- 登录：`http://127.0.0.1:5000/api/signin`
    - 方法：`POST`
    - 参数：`{ username: '', password: '' }`
    - 返回
        - 成功：`{ success: true, message: 'ok', user: { 用户信息 } }`
        - 失败：`{ success: false, message: '失败原因' }`

- 博客：`http://127.0.0.1:5000/api/blog`
    - 方法：`GET`
    - 返回
        - 成功：`{ success: true, message: 'ok', blogs: { 博客信息 } }`
        - 失败：`{ success: false, message: '失败原因' }`


#### 测试二：在 `test2` 目录下，按照 https://socket.io/get-started/chat/ 文档，搭建即时聊天应用
