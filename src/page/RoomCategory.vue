<template>
        <div class="container">
            <div class="portlet bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="el-icon-setting font-red"></i>
                        <span class="blod font-red">房间规格表</span>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="table-toolbar">
                        <el-form :inline="true" :model="filters" class="demo-form-inline">
                            <el-form-item>
                                <el-input v-model="filters.name" placeholder="名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">查询<i
                                        class="el-icon-search el-icon--right"></i>
                                </el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="handleAdd">添加规格<i
                                        class="el-icon-plus el-icon--right"></i>
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="table-body">
                        <!--表格-->
                        <el-table
                                @sort-change="sortChange"
                                :data="roomCategoryTable"
                                border
                                style="width: 100%">
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="id"
                                    label="序号"
                                    width="140">
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
                                    prop="number"
                                    label="床位数"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="prices"
                                    label="价格"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="airconditioner"
                                    label="空调"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="TV"
                                    label="电视"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="PC"
                                    label="电脑"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="wifi"
                                    label="wifi"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    sortable="custom"
                                    align="center"
                                    prop="img"
                                    label="图片"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="edit"
                                    label="编辑"
                                    width="120">
                                <template slot-scope="scope">
                                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">
                                        编辑
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="delete"
                                    label="删除"
                                    width="120">
                                <template slot-scope="scope">
                                    <el-button size="small" @click.native.prevent="deleteRow(scope.$index, tableData3)"
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

                                <el-form-item label="床位数">
                                    <el-input v-model="editForm.number" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="价格">
                                    <el-input v-model="editForm.prices"></el-input>
                                </el-form-item>

                                <el-form-item label="空调">
                                    <el-select v-model="editForm.airconditioner" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="电视">
                                    <el-select v-model="editForm.TV" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="电脑">
                                    <el-select v-model="editForm.PC" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="wifi">
                                    <el-select v-model="editForm.wifi" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-select v-model="editForm.img" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>

                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="editFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click.native="editSubmit" >确 定
                                </el-button>
                            </div>
                        </el-dialog>

                        <!--新增页面-->
                        <el-dialog title="新增" :visible.sync="addFormVisible">
                            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                                <el-form-item label="名称" prop="name">
                                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="床位数">
                                    <el-input v-model="addForm.number" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="价格">
                                    <el-input v-model="addForm.prices"></el-input>
                                </el-form-item>

                                <el-form-item label="空调">
                                    <el-select v-model="addForm.airconditioner" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="电视">
                                    <el-select v-model="addForm.TV" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="电脑">
                                    <el-select v-model="addForm.PC" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="wifi">
                                    <el-select v-model="addForm.wifi" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-select v-model="addForm.img" placeholder="状态">
                                        <el-option label="有" value="1"></el-option>
                                        <el-option label="无" value="0"></el-option>
                                    </el-select>
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
        export default {
            name: "RoomCategory",
            data() {
                return {
                    // 表格内容
                    roomCategoryTable: [],
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
                        number: '',
                        prices: '',
                        airconditioner: 1,
                        TV: 1,
                        PC: 1,
                        wifi: 1,
                        img: '',
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
                        number: '',
                        prices: '',
                        airconditioner: 1,
                        TV: 1,
                        PC: 1,
                        wifi: 1,
                        img: '',
                    },
                }
            },
            methods: {
                //性别显示转换
                formatSex: function (row) {
                    return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
                },
                // toolbar
                // 查询
                onSubmit() {
                    // let para = {
                    //     name: this.filters.name
                    // };
                },
                // 显示新增
                handleAdd: function () {
                    this.addFormVisible = true;
                },


                // 删除
                deleteRow(index, rows) {
                    rows.splice(index, 1);
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
                            this.editLoading = true;
                            this.$confirm('确认提交吗？', '提示', {}).then(() => {

                                this.editLoading = false;
                                this.editFormVisible = false;
                                // this.getUsers();
                            });

                        }
                    });
                },
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
            padding: 10px 20px 20px;
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
