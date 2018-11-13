<template>
    <div class="container">
        <div class="portlet-title">
            <div class="caption">
                <i class="iconfont font-red icon-design_layers"></i>
                <bold>
                <span class="caption-subject font-red uppercase">
                                到店入住 —
                                <span class="step-title"> Step 1 of 3 </span>
                </span>

                </bold>
            </div>
            <div class="actions">
                <el-row>
                    <el-button icon="el-icon-upload" circle></el-button>
                    <el-button icon="el-icon-setting" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                </el-row>
            </div>
        </div>
        <div class="portlet-body">
            <div class="form-body">
                <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
                    <el-step title="房间选择"></el-step>
                    <el-step title="旅客登记"></el-step>
                    <el-step title="信息确认"></el-step>
                </el-steps>
                <el-form ref="form" :model="form" label-width="80px" id="tab1" :visible.sync="chooseRoomVisible">
                    <h2>请选择房间</h2>
                    <el-form-item label="房间规格" required="true">
                        <el-select v-model="form.region" placeholder="请选择房间规格">
                            <el-option label="大床房" value="01"></el-option>
                            <el-option label="单人间" value="02"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-form ref="form" :model="form" label-width="80px" id="tab2" :visible.sync="chooseUserVisible">
                    <h2>请选择旅客</h2>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.tel" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证明">
                        <el-input v-model="form.IDcard" placeholder="身份证明"></el-input>
                    </el-form-item>
                </el-form>

                <el-form ref="form" :model="form" label-width="80px" id="tab3" :visible.sync="infoConfirmVisible">
                    <h2>信息确认</h2>
                    <h4>客房规格</h4>
                    <el-form-item v-model="form.region">
                    </el-form-item>
                    <h4>旅客</h4>
                    <el-form-item v-model="form.name"></el-form-item>
                </el-form>

            </div>

            <div class="form-actions">
                <!--<el-button style="margin-top: 12px;" @click="previous">上一步</el-button>-->
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Checkin",
        data() {
            return {
                active: 0,
                form: {
                    region: '',
                    tel: '',
                    IDcard: '',
                },
                // rules:{
                //     form:[{required:true}]
                // },
                chooseRoomVisible: true,
                chooseUserVisible: false,
                infoConfirmVisible: false,
            };
        },

        methods: {
            next: function () {
                var vm = this;
                if (this.active++ > 2) this.active = 0;
                if (vm.active = 0) {
                    this.chooseRoomVisible = true;
                    this.chooseUserVisible = false;
                    this.infoConfirmVisible = false;
                }
                else if (vm.active = 1) {
                    this.chooseRoomVisible = false;
                    this.chooseUserVisible = true;
                    this.infoConfirmVisible = false;
                } else {
                    this.chooseRoomVisible = false;
                    this.chooseUserVisible = false;
                    this.infoConfirmVisible = true;
                }
            }
        }


    }

    // previous() {
    //     if (this.active-- > 0) this.active = 0;
    // }


</script>

<style scoped>
    .container {
        border: 1px solid rgb(231, 236, 241);
        padding: 12px 20px 15px;
        margin-top: 0px;
    }

    .portlet-title {
        border-bottom: 1px solid rgb(238, 241, 245);
        padding: 0;
        min-height: 48px;
    }

    .caption {
        padding: 10px 0;
        float: left;
        font-size: 16px;
        line-height: 16px;
    }

    .caption::after {
        content: "";
        display: block;
        clear: both;
    }

    .caption .font-red {
        color: red;
    }

    .actions {
        float: right;
        /*padding: 6px 0 14px;*/
        display: inline-block;
        color: black;
        font-size: 16px;
    }

    .actions::after {
        content: "";
        display: block;
        clear: both;
    }

    /*.el-row i {*/
    /*margin: 0 !important;*/
    /*}*/

    .form-body {
        padding: 10px 0;
    }

    .el-form {
        padding: 10px 0;
        border-bottom: 1px solid rgb(238, 241, 245);
    }

    .el-form h2 {
        padding: 10px 0;
        font-weight: 300;
    }

    .el-form-item {
        /*text-align: center;*/
    }

    .el-form-item__label {
        /*text-align: center !important;*/
        /*margin-left: 120px;*/
    }

    .el-form-item__content {
        /*width: 230px;*/
    }

    .form-actions {
        text-align: center;
    }

    /*.display-no{*/
    /*display: none;*/
    /*}*/

</style>