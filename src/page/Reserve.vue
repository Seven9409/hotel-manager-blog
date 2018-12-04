<template>
    <div class="container">
        <h3 class="portlet-title">
            预定入住
            <small>点击“待入住”的规格名，进行入住操作</small>
        </h3>
        <div class="portlet-body">
            <div class="form-body">
                <el-form ref="form"
                         :inline="true"
                         :model="form"
                         labelPosition="left">
                    <el-form-item>
                        <el-input v-model="form.tel" placeholder="输入电话搜索预定信息" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getUsers">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="form-actions">
                <el-pagination
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Reserve",
        data() {
            return {
                form: {
                    tel: '',
                }
            }
        }

    }
</script>

<style scoped>
    .container {
        border: 1px solid rgb(231, 236, 241);
        padding: 12px 20px 15px;
        margin-top: 0;
    }

    .portlet-title {
        border-bottom: 1px solid rgb(238, 241, 245);
        padding: 0 0 10px 0;
        margin: 25px 0;
        font-size: 24px;
        font-weight: 300;
        color: #666;
        letter-spacing: -1px;
        display: block;
    }
    .portlet-body{

    }

    .form-actions {
    text-align: center;
    }


</style>