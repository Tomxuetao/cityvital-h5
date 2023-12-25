**项目启动命令**

```
启动命令：pnpm run dev
打包命令：pnpm run build
```

**代码提交规范**

```
集成了husky + commitlint
pnpm run commit
```

**项目主体目录**

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
│   ├── empty-page.vue
│   └── img
│       ├── icon-1-active.webp
│       ├── icon-1.webp
│       ├── icon-2-active.webp
│       ├── icon-2.webp
│       ├── icon-3-active.webp
│       ├── icon-3.webp
│       ├── icon-4-active.webp
│       ├── icon-4.webp
│       ├── icon-arrow.webp
│       ├── icon-filter-active.webp
│       ├── icon-filter.webp
│       ├── icon-search.webp
│       ├── img-empty-bg.webp
│       └── img-empty2-bg.webp
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
│   │   ├── img-index-bg.webp
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
├── comp
│   └── river-card.vue
├── img
│   └── icon-arrow.webp
└── index.vue
```
