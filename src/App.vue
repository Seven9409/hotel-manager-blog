<template>
    <div id="app">
        <transition name="fade"
                    mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Home from './components/Home.vue'
    export default {
        name: 'app',
        components: {
            Home
        }
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        /*color: #2c3e50;*/
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
    }

    body > .el-container {
        margin-bottom: 40px;

    }

    /*i {*/
        /*margin-right: 5px;*/
    /*}*/

    a {
        text-decoration: none;
    }
    /*.el-submenu [class^=fa] {*/
        /*vertical-align: baseline;*/
        /*margin-right: 10px;*/
    /*}*/

    /*.el-menu-item [class^=fa] {*/
        /*vertical-align: baseline;*/
        /*margin-right: 10px;*/
    /*}*/

    /*.toolbar {*/
        /*background: #f2f2f2;*/
        /*padding: 10px;*/
    /*//border:1px solid #dfe6ec;*/
        /*margin: 10px 0px;*/
    /*.el-form-item {*/
        /*margin-bottom: 10px;*/
    /*}*/
    /*}*/

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

</style>


