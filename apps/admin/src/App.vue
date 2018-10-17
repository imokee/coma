
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-logo{
    width: 150px;
    height: 45px;    
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 0px;
    background-image:url(./images/daweilab-logo.png);
    background-size:100% 100%;
}
.layout-nav{
    width: 100px;
    margin: 0 auto;
    margin-right: 10px;
}

.ivu-layout{
    flex: 1;
    height: 100%;
}

.ivu-menu a{
    color:#888888;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-exit-outline"/>
                            退出
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="文章管理" theme="light" width="auto" :open-names="['1']" @on-select="menu_select">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                内容管理
                            </template>
                            <router-link to="/article">
                                <MenuItem name="文章管理" >                                    
                                    文章管理                                    
                                </MenuItem>
                            </router-link>
                            <router-link to="/member">
                                <MenuItem name="会员管理">                                    
                                    会员管理         
                                </MenuItem>
                            </router-link>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                系统管理
                            </template>
                            <router-link to="/manager">
                                <MenuItem name="管理员管理">                                    
                                    管理员管理                                    
                                </MenuItem>
                            </router-link>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem v-for="nav in navs" :key="nav.id">{{nav}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                navs : ["主页","文章管理"]
            }
        },
        methods:{
            menu_select(name){
                console.log(name);
                this.navs = ["主页",name]
            }
        }
    }
</script>