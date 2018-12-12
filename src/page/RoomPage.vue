<template>
    <div class="container">
        <div class="portlet bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="el-icon-setting font-red"></i>
                    <span class="blod font-red">房间表</span>
                </div>
                <el-row>
                    <el-button icon="el-icon-upload" circle></el-button>
                    <el-button icon="el-icon-setting" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                </el-row>
            </div>
            <div class="portlet-body">
                <div class="table-toolbar">
                    <el-form :inline="true" :model="filters" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getRoomTable">查询<i class="el-icon-search el-icon--right"></i>
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="handleAdd">添加房间<i class="el-icon-plus el-icon--right"></i>
                            </el-button>
                        </el-form-item>
                    </el-form>


                </div>
                <div class="table-body">
                    <!--表格-->
                    <el-table
                            @sort-change="sortChange"
                            :data="roomTable"
                            border
                            style="width: 100%">
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="id"
                                label="序号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="name"
                                label="名称">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="position"
                                label="位置"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                prop="description"
                                label="描述"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                align="center"
                                :formatter="formatCid"
                                prop="cid"
                                label="规格"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                sortable="custom"
                                width="180"
                                align="center"
                                :formatter="formatState"
                                prop="state"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="edit"
                                label="编辑"
                                width="130">
                            <template slot-scope="scope">
                                <el-button  @click="handleEdit(scope.$index, scope.row)" type="primary">编辑
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="delete"
                                label="删除"
                                width="130">
                            <template slot-scope="scope">
                                <el-button  @click.native.prevent="deleteRow(scope.$index, scope.row)"
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
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="editForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="位置">
                                <el-input v-model="editForm.position" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="editForm.description"></el-input>
                            </el-form-item>
                            <el-form-item label="规格">
                                <el-select v-model="editForm.cid" placeholder="状态">
                                    <el-option label="豪华单人间" value="0"></el-option>
                                    <el-option label="大床房" value="1"></el-option>
                                    <el-option label="双人间" value="2"></el-option>
                                    <el-option label=" 单人间" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-model="editForm.state" placeholder="状态">
                                    <el-option label="启用" value="0"></el-option>
                                    <el-option label="禁用" value="1"></el-option>
                                    <el-option label="入住中" value="2"></el-option>
                                    <el-option label="已预定" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="editFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click.native="editSubmit" >确 定</el-button>
                        </div>
                    </el-dialog>

                    <!--新增页面-->
                    <el-dialog title="新增" :visible.sync="addFormVisible">
                        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="addForm.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="位置">
                                <el-input v-model="addForm.position" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="addForm.description"></el-input>
                            </el-form-item>
                            <el-form-item label="规格">
                                <el-select v-model="addForm.cid" placeholder="状态">
                                    <el-option label="豪华单人间" value="0"></el-option>
                                    <el-option label="大床房" value="1"></el-option>
                                    <el-option label="双人间" value="2"></el-option>
                                    <el-option label=" 单人间" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select v-model="addForm.state" placeholder="状态">
                                    <el-option label="启用" value="enable"></el-option>
                                    <el-option label="禁用" value="disable"></el-option>
                                    <el-option label="入住中" value="2"></el-option>
                                    <el-option label="已预定" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addSubmit">确 定</el-button>
                        </div>
                    </el-dialog>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from "../api/api"
    import * as RestCode from "../common/RestCode"

    export default {
        name: "RoomPage",
        data() {
            return {
                // 表格内容
                roomTable: [],
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
                        {required: true, message: '请输入房间名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    position: '',
                    description: '',
                    cid: '',
                    state:0,
                },
                addFormVisible: false,//新增界面是否显示
                addFormRules: {
                    name: [
                        {required: true, message: '请输入房间名', trigger: 'blur'}
                    ]
                },
                // 新增页面数据
                addForm: {
                    id: 0,
                    name: '',
                    position: '',
                    description: '',
                    cid: 0,
                    state: 0,
                },
            }
        },
        methods: {
            //规格显示转换
            formatCid: function (cid) {
                // console.log("sex===" + row.sex)
                let cname="";
                switch (cid) {
                    case 0:
                        cname=  '豪华单人间'
                        break;
                    case 1:
                        cname='大床房'
                        break;
                    case 2:
                        cname='双人间'
                        break;
                    case 3:
                        cname='单人间'
                        break;
                    default:
                        cname='未知'
                }
                return cname;
                // return row.cid == '0' ? '豪华单人间' : row.cid == '1' ? '大床房' :  row.cid == '2' ? '双人间' : row.cid == '3' ?'单人间':'未知'
            },
            //状态显示转换
            formatState: function (res) {
                // console.log(res)
                // return row.state == 'enable' ? '启用' : row.state == 'disable' ? '禁用' : '未知';
                // let cname="";
                switch (res.state) {
                    case 'enable':
                       return   '启用'
                    case 'disable':
                        return  '禁用'
                    case 2:
                        return '入住中'
                    case 3:
                        return  '已预定'
                    default:
                        return  '未知'
                }
            },

            // 分页
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getRoomTable();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRoomTable();
            },
            sortChange: function (column) {
                // console.log("column", column, column.prop, column.order)
                this.orderColumn = column.prop;
                this.order = column.order;
                // console.log("data", this.orderColumn, this.order)
                this.getRoomTable()
            },
            //获取房间列表
            getRoomTable() {
                let params = new URLSearchParams();
                params.append('currentPage', this.currentPage - 1);
                params.append('pageSize', this.pageSize);
                params.append('orderColumn', this.orderColumn);
                params.append('order', this.order === 'ascending' ? 'asc' : 'desc');
                params.append('name', this.filters.name);
                api.hotelTable(params).then((res) => {
                    // console.log(res)
                    this.totalPages = res.data.data.totalElements;
                    this.roomTable = res.data.data.content;
                    // console.log("tableData", this.tableData)

                });
            },
            // 显示新增
            handleAdd: function () {
                this.addFormVisible = true;
            }
            ,
            // 新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        api.addRoom(this.addForm).then((res) => {
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
                        this.getRoomTable();

                    }
                });
            },

            // 删除
            deleteRow: function (index, row) {
                // console.log(index,row)
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    api.removeRoom(row.userId).then((res) => {
                        // console.log(res)
                        let code = res.data.code;
                        // console.log(code)
                        if (code === RestCode.SUCCESS) {
                            this.$message.success('删除成功!');
                            this.getRoomTable();
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
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let para = Object.assign({}, this.editForm);
                            api.editRoom(para).then((res) => {
                                // console.log(res)
                                let code = res.code;
                                // console.log(code)
                                if (code === RestCode.SUCCESS) {
                                    this.$message.success('修改成功!');
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getRoomTable();
                                } else if (code === RestCode.RECORD_NOT_FOUND) {
                                    this.$message.warning('目标不存在!');
                                }
                                else if (code === RestCode.FAIL) {
                                    this.$message.error('修改失败!');
                                }
                                else {
                                    this.$message.info('已取消操作!');
                                }
                            });
                        }).catch(() => {
                            this.$message.info('已取消操作!');
                        });
                    }
                });
            },

        },
        mounted: function () {
            this.getRoomTable();
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

    .el-row {
        float: right;
    }

    .el-row::after {
        clear: both;
        content: "";
        display: table;
    }

    .portlet-body {
        padding: 10px 20px;
        /*margin-bottom: 20px;*/
    }

    .table-toolbar {
        margin-bottom: 20px;
        margin-top: 20px;
        padding-top: 10px;
    }
    .el-pagination {
        margin-top: 20px;
        text-align: right;
    }


</style>