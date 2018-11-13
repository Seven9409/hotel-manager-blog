<template>
    <!--导航栏-->
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="3">
                <div class="grid-content bg-purple logo"><strong>{{sysName}}</strong></div>
            </el-col>
            <el-col :span="17">
                <div class="grid-content bg-purple menuBar">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label="false">展 开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收 起</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple tools">
                    <el-dropdown style="float: right">
                        <span class="el-dropdown-link"><strong>{{message}}</strong>
                             <i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click="infodefend">
                                <i class="iconfont icon-lock"></i>信息维护
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout">
                                <i class="iconfont icon-yuechi1"></i>注销
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-col>

        <!--侧边栏导航-->
        <!--<el-container>-->
        <!--<el-aside width="241px">-->
        <el-col :span="24" class="main">
            <aside>
                <!--:collapse="isCollapse?'sidebar-collapsed':'sidebar-enpended'"-->
                <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                         background-color="#eef1f6" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="iconfont icon-jinru"></i>
                            <span slot="title">入住</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/home/checkin')">到店入住</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/home/Reserve')">预订入住</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2" @click="$router.push('/home/checkout')">
                        <i class="iconfont icon-tuichu2"></i>
                        <span slot="title">退房</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('/home/onlineCategory')">
                        <i class="iconfont icon-guigecanshu"></i>
                        <span slot="title">在线规格管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="$router.push('/home/userPage')">
                        <i class="iconfont icon-accountfilling"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="$router.push('/home/roomPage')">
                        <i class="iconfont icon-fangjian1"></i>
                        <span slot="title">房间管理</span>
                    </el-menu-item>
                    <el-menu-item index="6" @click="$router.push('/home/roomCategory')">
                        <i class="iconfont icon-guige"></i>
                        <span slot="title">房间规格管理</span>
                    </el-menu-item>
                    <el-menu-item index="7" @click="$router.push('/home/customerPage')">
                        <i class="iconfont icon-fangjian"></i>
                        <span slot="title">住户信息管理</span>
                    </el-menu-item>
                </el-menu>
                <!--</el-aside>-->
            </aside>


            <!--<el-main>-->
            <section class="content-container">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-white">
                            <el-breadcrumb separator="/" style="line-height: 50px">
                                <el-breadcrumb-item><a href="/home"> Home </a></el-breadcrumb-item>
                                <el-breadcrumb-item>System</el-breadcrumb-item>
                            </el-breadcrumb>

                            <!--<a href="/home" class="homeBt">Home</a>-->
                            <!--<span class="sysBt">System</span>-->
                        </div>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </el-row>
            </section>
            <!--</el-main>-->
        </el-col>
        <!--</el-container>-->
    </el-row>

</template>

<script>
    import storage from "../common/Util"


    export default {
        name: 'Home',
        data() {
            return {
                sysName: '酒店管理系统',
                isCollapse: false,
                message: 'tool',
            };
        },
        methods: {
            // 信息维护
            infodefend(key){
                console.log(key)
            },
            // 注销
            logout: function () {
                var vm = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    storage.removeStorage('user');
                    storage.removeStorage('token');
                    // sessionStorage.removeItem('user');
                    vm.$router.push('/login');
                    // console.log(11)
                }).catch(() => {
                });
            },

            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },

        }
    }
</script>

<style scoped>
    i {
        margin-right: 5px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple {
        background: rgb(64, 158, 255);

    }

    .grid-content {
        /*border-radius: 4px;*/
        min-height: 50px;
        line-height: 50px;
    }

    .logo {
        text-align: center;
        border-right: 1px solid #BBFFFF;
    }

    .menuBar {
        padding-left: 15px;
    }

    .tools {
        padding-right: 60px;
    }

    /*侧边栏导航*/
    /*.el-aside {*/
    /*background-color: #D3DCE6;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 200px;*/
    /*width: 240px;*/
    /*}*/
    /*.sidebar-collapsed {*/
    /*flex: 0 0 230px;*/
    /*width: 70px;*/
    /*}*/

    /*.sidebar-enpended {*/
    /*flex: 0 0 230px;*/
    /*width: 230px;*/
    /*}*/

    .el-menu {
        height: 100%;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: 400px;
    }

    /*main*/
    /*.el-main {*/
    /*background-color: #fff;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*}*/
    .main {
        display: flex;
    }

    .main .content-container {
        flex: 1;
        overflow-y: scroll;
        padding: 0 20px;
    }

    .bg-purple-white {
        border-bottom: 1px solid #e7ecf1;
    }

</style>


