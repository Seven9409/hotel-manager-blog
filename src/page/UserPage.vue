<template>
    <div class="container">
        <div class="portlet bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="el-icon-setting font-red"></i>
                    <span class="blod font-red">用户信息表</span>
                </div>
            </div>
            <div class="portlet-body">
                <div class="table-toolbar">
                    <el-form :inline="true" :model="filters" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getUsers">查询<i class="el-icon-search el-icon--right"></i>
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="handleAdd">新增<i class="el-icon-plus el-icon--right"></i>
                            </el-button>
                        </el-form-item>
                    </el-form>

                </div>
                <div class="table-body">
                    <!--表格-->
                    <el-table
                            @sort-change="sortChange"
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="id"
                                label="编号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="name"
                                label="账户名"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                :formatter="formatSex"
                                align="center"
                                width="100"
                                prop="gender"
                                label="性别">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="nickname"
                                label="昵称"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="phoneNumber"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="email"
                                label="邮箱">
                        </el-table-column>
                        <el-table-column
                                :formatter="formatDate"
                                sortable="custom"
                                align="center"
                                prop="createDate"
                                min-width="60px"
                                label="创建日期">
                            <!--<div>{{ props.row.createDate | moment('YYYY年MM月DD日 HH:mm:ss')}}</div>-->
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                width="100"
                                align="center"
                                :formatter="formatStatus"
                                prop="state"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                width="200"
                                align="center"
                                prop="description"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="edit"
                                label="编辑"
                                width="100">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="delete"
                                label="删除"
                                width="100">
                            <template slot-scope="scope">
                                <el-button size="small" @click="deleteRow(scope.$index, scope.row)"
                                           type="danger">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalPages">
                    </el-pagination>

                    <!--编辑页面-->
                    <el-dialog title="编辑" :visible.sync="editFormVisible">
                        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                            <el-form-item label="账户名" prop="name">
                                <el-input v-model="editForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="editForm.gender">
                                    <el-radio class="radio" :label="'male'">男</el-radio>
                                    <el-radio class="radio" :label="'female'">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="昵称">
                                <el-input v-model="editForm.nickname" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="editForm.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item
                                    prop="email"
                                    label="邮箱"
                                    :rules="editFormRules">
                                <el-input v-model="editForm.email"></el-input>
                            </el-form-item>
                            <el-form-item label="创建日期">
                                <el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-model="editForm.state" placeholder="状态">
                                    <el-option label="启用" value="enable"></el-option>
                                    <el-option label="禁用" value="disable"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="editForm.description"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="editFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click.native="editSubmit">确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--新增页面-->
                    <el-dialog title="新增" :visible.sync="addFormVisible">
                        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                            <el-form-item label="账户名" prop="name">
                                <el-input v-model="addForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="addForm.gender">
                                    <el-radio class="radio" :label="'male'">男</el-radio>
                                    <el-radio class="radio" :label="'female'">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="昵称">
                                <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="addForm.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item
                                    prop="email"
                                    label="邮箱">
                                <el-input v-model="addForm.email"></el-input>
                            </el-form-item>
                            <!--<el-form-item label="创建日期">-->
                                <!--<el-date-picker type="date" placeholder="选择日期" v-model="addForm.date"></el-date-picker>-->
                            <!--</el-form-item>-->
                            <el-form-item label="状态">
                                <el-select v-model="addForm.state" placeholder="状态">
                                    <el-option label="启用" value="enable"></el-option>
                                    <el-option label="禁用" value="disable"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="addForm.description"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addSubmit" >确 定</el-button>
                        </div>
                    </el-dialog>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from "../api/api"
    import * as dataFormat from '../common/Moment';
    import * as RestCode from "../common/RestCode"

    export default {
        name: "UserPage",
        data() {
            return {
                // 表格内容
                tableData: [],
                // toolbar
                filters: {
                    name: '',

                },
                currentPage: 1,// 当前页
                pageSize: 5, // 每页显示条目个数
                totalPages: 5,
                orderColumn: "id",
                //ascending, descending
                order: "ascending",

                editFormVisible: false,//编辑界面是否显示
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    gender: 'male',
                    nickname: '',
                    phoneNumber: '',
                    email: '',
                    createDate: '',
                    state: 'disable',
                    description: '',
                },
                addFormVisible: false,//新增界面是否显示
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]
                },
                // 新增页面数据
                addForm: {
                    // id: 1,
                    name: '',
                    gender: 'male',
                    nickname: '',
                    phoneNumber: '',
                    email: '',
                    // createDate: '',
                    state: 'disable',
                    description: '',
                },

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row) {
                // console.log("sex===" + row.sex)
                return row.gender == 'male' ? '男' : row.gender == 'female' ? '女' : '未知';
            },
            //状态显示转换
            formatStatus: function (row) {
                return row.state == 'enable' ? '启用' : row.state == 'disable' ? '禁用' : '未知';
            },

            formatDate: function (row, column, cellValue) {
                // console.log(row, column, cellValue, index)
                return dataFormat.formatTimeToStr(cellValue, 'yyyy年MM月dd日 hh:mm:ss')
            },
            // 分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getUsers();
            }
            ,
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getUsers();
            },
            sortChange: function (column) {
                // console.log("column", column, column.prop, column.order)
                this.orderColumn = column.prop;
                this.order = column.order;
                // console.log("data", this.orderColumn, this.order)
                this.getUsers()
            },
            //获取用户列表
            getUsers() {
                let params = new URLSearchParams();
                params.append('currentPage', this.currentPage - 1);
                params.append('pageSize', this.pageSize);
                params.append('orderColumn', this.orderColumn);
                params.append('order', this.order === 'ascending' ? 'asc' : 'desc');
                params.append('userName', this.filters.name);
                api.userList(params).then((res) => {
                    // console.log(this.totalPages)
                    this.totalPages = res.data.data.totalElements;
                    this.tableData = res.data.data.content;
                    // console.log("tableData", this.tableData)
                    //NProgress.done();
                    // console.log(this.totalPages)
                });
            },


            // toolbar
            // 查询
            // onSubmit: function () {
            //
            //     // this.getUsers()
            //     console.log(this.filters.name)
            //     // let params = new URLSearchParams();
            //     // params.append('username', this.filters.name);
            //     api.userFind(this.filters.name).then((res) => {
            //         console.log(res)
            //         this.tableData = res.data;
            //     });
            //     this.getUsers()
            //
            // },
            // 显示新增
            handleAdd: function () {
                this.addFormVisible = true;
            }
            ,
            // 新增
            addSubmit: function () {
                // console.log(this.addForm)
                // this.tableData.push(this.addForm)

                    // console.log(this.addForm)
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        api.requestRegister(this.addForm).then((res) => {
                            // console.log(this.addForm)
                            let code = res.code;
                            // let msg = res.msg;
                            if (code === RestCode.SUCCESS) {
                                this.$message.success('添加成功！');
                                this.addForm = {};
                            }
                            else if (code === RestCode.RECORD_ALREADY_EXISTS) {
                                this.$message.warning('用户已存在！');
                            }
                            else {
                                this.$message.error('添加失败！');
                            }
                        });
                        this.addFormVisible = false;
                        // this.$refs['addForm'].resetFields();
                        this.getUsers();
                        // });

                    }
                });
            },

            // 删除
            deleteRow: function (index, row) {
                // console.log(index,row)
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    api.removeUser(row.userId).then((res) => {
                        // console.log(res)
                        let code = res.data.code;
                        // console.log(code)
                        if (code === RestCode.SUCCESS) {
                            this.$message.success('删除成功!');
                            this.getUsers();
                        } else if (code === RestCode.RECORD_NOT_FOUND) {
                            this.$message.warning('用户不存在!');
                        }
                        else if (code === RestCode.FAIL) {
                            this.$message.error('删除失败!');
                        }
                        else {
                            this.$message.info('已取消操作!');
                        }

                    });
                }).catch(() => {
                    this.$message.info('已取消操作!');
                });

            },


            // 显示编辑
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            }
            ,
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let para = Object.assign({}, this.editForm);
                            api.editUser(para).then((res) => {
                                this.$message.success('提交成功！');

                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });

                    }
                });
            },
        },
        mounted: function () {
            this.getUsers();

        }
    }

</script>

<style scoped>
    .container {
        padding: 0 15px;
    }

    .portlet {
        margin-top: 0;
        padding: 0;
        margin-bottom: 25px;
    }

    .bordered {
        border: 1px solid #e7ecf1 !important;
    }

    .portlet-title {
        padding: 17px 20px 10px;
        margin-bottom: 0;
        border-bottom: 1px solid #e7ecf1;
        min-height: 48px;
    }

    .caption {
        padding: 10px 0;
        float: left;
        font-size: 18px;
        display: inline-block;
        line-height: 18px;
    }

    .caption::after {
        clear: both;
        content: "";
        display: table;
    }

    .caption i {
        margin-right: 5px;
        font-weight: 300;
    }

    .blod {
        font-weight: 700 !important;
        font-size: 16px;
    }

    .font-red {
        color: red;
    }

    .portlet-body {
        padding: 10px 20px 0;
        margin-bottom: 20px;
    }

    .table-toolbar {
        margin-bottom: 20px;
        margin-top: 20px;
        padding-top: 10px;
    }

    .table-body {
        margin: 0 10px 20px;
    }

    .el-pagination {
        margin-top: 20px;
        padding: 10px 10px;
        text-align: right;
    }

</style>

<!--{-->
<!--number: '1',-->
<!--name: '王小虎',-->
<!--email: '1212@we',-->
<!--nickname: '撒旦撒旦',-->
<!--tel: '1548485',-->
<!--sex: 'female',-->
<!--date: '2017-01-21',-->
<!--status: 'enable',-->
<!--description: '',-->
<!--}, {-->
<!--number: '2',-->
<!--name: '李四',-->
<!--email: '34535@we',-->
<!--nickname: ' 得瑟得瑟',-->
<!--tel: '154834325',-->
<!--sex: 'male',-->
<!--date: '2017-01-21',-->
<!--status: 'enable',-->
<!--description: '',-->
<!--}, {-->
<!--number: '3',-->
<!--name: '张三',-->
<!--email: '3232@we',-->
<!--nickname: '发电方式',-->
<!--tel: '1343455',-->
<!--sex: 'female',-->
<!--date: '2017-01-21',-->
<!--status: 'disable',-->
<!--remark: '',-->
<!--}, {-->
<!--number: '4',-->
<!--name: '黑虎',-->
<!--email: '15646@we',-->
<!--nickname: '阿三',-->
<!--tel: '1655655',-->
<!--sex: 'male',-->
<!--date: '2017-01-21',-->
<!--status: 'enable',-->
<!--description: '',-->
<!--}, {-->
<!--number: '5',-->
<!--name: '张海',-->
<!--email: '15612@we',-->
<!--nickname: '覅放',-->
<!--tel: '18779766',-->
<!--sex: 'male',-->
<!--date: '2017-01-21',-->
<!--status: 'disable',-->
<!--description: '',-->
<!--}, {-->
<!--number: '6',-->
<!--name: '马晓',-->
<!--email: '12342@we',-->
<!--nickname: '二二',-->
<!--tel: '1435365546',-->
<!--sex: 'male',-->
<!--date: '2017-01-21',-->
<!--status: 'enable',-->
<!--description: '',-->
<!--}-->