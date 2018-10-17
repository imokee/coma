# coma
Koa2+webpack+MongoDB = 小应用容器（container of mini app）

### 项目介绍
之前接触了很多微信上面集成的小应用，每个功能比较单一，或者一个平台有若干个单一功能的小应用集成，但是运行需要的基础环境却比较类似。于是便有了这个小应用运行环境容器。
此项目是对过去项目开发过程中一些基础开发环境的抽象，使每个app都可以独立的运行在环境中，方便app的开发、部署、交付等工作。
希望帮助有同类需求的开发者节约开发时间，提高开发效率。


### 功能介绍

####1.coma
基于koa2提供了运行开发环境，及应用后台插架机制

####2.coma-deployer
基于webpack实现了前端代码开发调试环境和部署功能（针对单页面应用）

####3.coma-render
基于art-template实现页面的服务器渲染（针对需要SEO或静态化的多页面应用）

####4.coma-dai
基于mongodb+mongoose实现了数据访问接口，通过模型配置即可自动实现增删改查等api接口，并且封装了前端调用接口

### 应用实例

####1.apps/home
coma-render的demo，通过后台渲染，前端库集成了jQuery和bootstrap

####2.apps/dai
coma-dai的demo，coma-dai可以作为在每个应用中使用，但是由于三个demo公用一套数据访问接口，所以单独放在一个应用中，作为后台接口

####3.apps/admin
基于coma-deployer开发vue项目的demo

####3.apps/mobile
基于coma-deployer开发react项目的demo




