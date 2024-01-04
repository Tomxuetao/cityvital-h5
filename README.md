# 项目启动命令

```
启动命令：pnpm run dev
打包命令：pnpm run build
```

# 本地开发调试

```
访问启动后的地址，例如：http://localhost:5173/vital-h5

请在http://localhost:5173/vital-h5后面拼接上?token={在三中心登录后获取的accessToken}

示例如下：
http://localhost:5173/vital-h5/?token=515ee000-82e4-4478-9b1f-784f60a92713
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

Git: [https://git.citycloud.com.cn:3000/project_cityvital/cityvital-h5](https://git.citycloud.com.cn:3000/project_cityvital/cityvital-h5)

测试环境(需要在浙政钉环境下才能打开、也可以通过拼接token的方式在浏览器环境打开): [https://zf.cgw.hangzhou.gov.cn:9443/cityvital-app/vital-h5/](https://zf.cgw.hangzhou.gov.cn:9443/cityvital-app/vital-h5/)

# 项目主体目录

```
.
├── App.vue
├── api
│   ├── common-api.js
│   ├── home-api.js
│   └── login-api.js
├── assets
│   ├── font
│   │   ├── Alternate-Bold.ttf
│   │   ├── YouSheBiaoTiHei.ttf
│   │   └── index.css
│   ├── img
│   └── scss
│       ├── _base.scss
│       ├── _mixins.scss
│       ├── _variables.scss
│       └── index.scss
├── components
│   ├── custom-cascader.vue
│   └── index.js
├── config
│   └── index.js
├── main.js
├── router
│   └── index.js
├── store
│   ├── index.js
│   └── modules
│       └── common.js
├── utils
│   ├── http.js
│   └── index.js
└── views
    ├── common
    │   ├── common-input.vue
    │   ├── common-list.vue
    │   ├── common-tabs.vue
    │   ├── common-title.vue
    │   ├── custom-list.vue
    │   ├── empty-page.vue
    │   ├── img
    │   │   ├── icon-1-active.webp
    │   │   ├── icon-1.webp
    │   │   ├── icon-2-active.webp
    │   │   ├── icon-2.webp
    │   │   ├── icon-3-active.webp
    │   │   ├── icon-3.webp
    │   │   ├── icon-4-active.webp
    │   │   ├── icon-4.webp
    │   │   ├── icon-arrow.webp
    │   │   ├── icon-filter-active.webp
    │   │   ├── icon-filter.webp
    │   │   ├── icon-search.webp
    │   │   ├── img-empty-bg.webp
    │   │   └── img-empty2-bg.webp
    │   └── third-filter.vue
    ├── layout
    │   ├── main-header.vue
    │   └── main-index.vue
    └── modules
        ├── alarm
        │   ├── alarm-detail.vue
        │   ├── comp
        │   │   └── alarm-card.vue
        │   └── index.vue
        ├── device
        │   ├── comp
        │   │   ├── card-item.vue
        │   │   └── card-wrap.vue
        │   ├── img
        │   │   └── img-header-bg.webp
        │   └── index.vue
        ├── home
        │   ├── comp
        │   │   └── index-card.vue
        │   ├── img
        │   │   ├── icon-1.webp
        │   │   ├── icon-10-alarm.webp
        │   │   ├── icon-10.webp
        │   │   ├── icon-11-alarm.webp
        │   │   ├── icon-11.webp
        │   │   ├── icon-2.webp
        │   │   ├── icon-3.webp
        │   │   ├── icon-4-alarm.webp
        │   │   ├── icon-4.webp
        │   │   ├── icon-5-alarm.webp
        │   │   ├── icon-5.webp
        │   │   ├── icon-6-alarm.webp
        │   │   ├── icon-6.webp
        │   │   ├── icon-7-alarm.webp
        │   │   ├── icon-7.webp
        │   │   ├── icon-8-alarm.webp
        │   │   ├── icon-8.webp
        │   │   ├── icon-9-alarm.webp
        │   │   ├── icon-9.webp
        │   │   ├── img-home-bg.webp
        │   │   ├── img-sign-0.webp
        │   │   └── img-sign-1.webp
        │   └── index.vue
        ├── manage
        │   └── index.vue
        ├── run-index
        │   ├── comp
        │   │   └── index-card.vue
        │   ├── img
        │   │   └── img-index-bg.webp
        │   └── index.vue
        ├── service
        │   └── index.vue
        ├── sign
        │   ├── comp
        │   │   ├── sign-card.vue
        │   │   └── sign-title.vue
        │   ├── img
        │   │   ├── icon-1.webp
        │   │   ├── icon-2.webp
        │   │   ├── icon-3.webp
        │   │   ├── icon-4.webp
        │   │   ├── icon-5.webp
        │   │   ├── icon-6.webp
        │   │   ├── icon-7.webp
        │   │   └── img-sign-bg.webp
        │   └── index.vue
        ├── synergy
        │   └── index.vue
        └── vital-signs
            ├── city-detail.vue
            ├── comp
            │   ├── alarm-card.vue
            │   ├── alarm-list.vue
            │   ├── city-card.vue
            │   ├── line-chart.vue
            │   ├── water-card.vue
            │   └── water-monitor.vue
            ├── img
            │   ├── icon-1.webp
            │   ├── icon-arrow.webp
            │   └── img-title-bg.webp
            ├── index.vue
            └── water-detail.vue

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
