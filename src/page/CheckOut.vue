<template>
    <div class="container">
        <h3 class="portlet-title">
            退房
        </h3>
            <div class="portlet-body">
                <div class="table-toolbar">
                    <el-form :inline="true" :model="filters" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="输入房间号搜索"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="getUsers">搜索
                            </el-button>
                        </el-form-item>
                    </el-form>

                </div>
                <div class="table-body">
                    <!--表格-->
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                prop="id"
                                label="编号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="room"
                                label="房间规格">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="roomNumber"
                                label="房间号">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="data"
                                label="入住时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="prices"
                                label="价格">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="operation"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary">退房
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
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "ChenckOut",
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
    .table-body{
        overflow: hidden;
    }
   .el-pagination{
  float: right;
       margin-top: 20px;
    }
</style>