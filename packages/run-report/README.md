# 项目启动命令

```
启动命令：pnpm run dev
打包命令：pnpm run build
代码提交：pnpm run commit
```

# 本地开发调试

```
访问启动后的地址，例如：http://localhost:5173/report-h5

请在http://localhost:5173/report-h5后面拼接上?token={在三中心登录后获取的accessToken}

示例如下：
http://localhost:5173/report-h5/?token=515ee000-82e4-4478-9b1f-784f60a92713
```

# 项目规范

## 代码提交

```
集成了husky + commitlint
pnpm run commit
```

## 文件命名

```
除字体文件外，所有的文件包括文件夹命名都请使用全小写的英文，多个单词请使用 ‘-’ 连接
```

# 相关链接

图片压缩工具: [https://squoosh.app/](https://squoosh.app/)

UI: [https://app.mockplus.cn/app/f1LfFs4kLA/develop/design/XDVFvrodN](https://app.mockplus.cn/app/f1LfFs4kLA/develop/design/XDVFvrodN)

Git: [https://git.citycloud.com.cn:3000/project_cityvital/report-h5](https://git.citycloud.com.cn:3000/project_cityvital/report-h5)

测试环境(需要在浙政钉环境下才能打开、也可以通过拼接token的方式在浏览器环境打开): [https://zf.cgw.hangzhou.gov.cn:9443/cityvital-app/report-h5/](https://zf.cgw.hangzhou.gov.cn:9443/cityvital-app/report-h5/)

# 项目主体目录

```

```

# 针对项目涉及到的图片说明

```
1、项目上用到的图片都采用webp的格式
2、小的Icon使用`icon-`的前缀命名
3、Icon以外的背景图以及其他形式的图片使用`img-`的前缀命名
4、针对Icon依据从上到下、从左到右的索引来确定其名称
5、针对每个模块的图片请放在模块下的img文件夹下
6、多个Icon在页面上使用时，请调用utils/index.js下的getImgUrlFn的方法去加载
7、静态图片全部采用二倍图的形式(将UI提供的*2的png图片转换成webp按照75%的质量去转换)
```
