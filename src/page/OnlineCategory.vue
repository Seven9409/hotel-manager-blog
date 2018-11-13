<template>
    <div class="container">
        <h3 class="page-title">
            线上规格设置
            <small>按方向键进行选择，空格键设置规格上下线。</small>
        </h3>
        <el-row>
            <el-col :span="12">
                <div class="bordered portlet">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="iconfont icon-qiu font-green"></i>
                            <span class="font-green blod">线上规格表</span>
                        </div>
                    </div>
                    <el-row class="transfer-body">
                        <!--<p>规格调整</p>-->
                        <el-col :span="5">规格调整</el-col>
                        <el-col :span="19">
                            <el-transfer
                                    filterable
                                    :titles="['待上线列表', '已上线列表']"
                                    :filter-method="filterMethod"
                                    filter-placeholder="搜索客房规格"
                                    v-model="value2"
                                    :data="data2">
                            </el-transfer>
                        </el-col>
                    </el-row>
                    <div class="tansfer-action">
                        <el-button icon="el-icon-check" class="btn-green"> 更新线上规格</el-button>
                        <el-button>重置</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="bordered portlet">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="iconfont icon-qiu font-green"></i>
                            <span class="font-green blod">规格修改表</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="table-body">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="number"
                                        label="#"
                                        width="70">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="规格名称"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="status"
                                        label="规格状态"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="price"
                                        label="规格价格"
                                        width="180">
                                </el-table-column>
                                <el-table-column label="修改价格">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleChange(scope.$index, scope.row)">修改价格</el-button>
                                </template>
                                </el-table-column>
                            </el-table>
                        </div>

                        <div class="table-action">
                            <el-pagination
                                    small
                                    layout="prev, pager, next"
                                    :total="50">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "OnlineCategory",
        data() {
            const generateData2 = _ => {
                const data = [];
                const categorys = ['双人床', '大床房', '豪华单人间', '大床房', '单人间'];
                const pinyin = ['shuangrenchuang', 'dachuangfang', 'huaohuadanrenjian', 'dachuangfang', 'danrenjian'];
                categorys.forEach((category, index) => {
                    data.push({
                        label: category,
                        key: index,
                        pinyin: pinyin[index]
                    });
                });
                return data;
            };
            return {
                data2: generateData2(),
                value2: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                // 表格
                tableData: [{
                    number: '1',
                    name: '豪华单人间',
                    status: '未上线',
                    price: '500',
                    changePrice: '',
                }, {
                    number: '2',
                    name: '大床房',
                    status: '未上线',
                    price: '800',
                    changePrice: '',
                }, {
                    number: '3',
                    name: '双人床',
                    status: '未上线',
                    price: '650',
                    changePrice: '',
                }, {
                    number: '4',
                    name: '大床房',
                    status: '未上线',
                    price: '800',
                    changePrice: '',
                }, {
                    number: '5',
                    name: '单人间',
                    status: '未上线',
                    price: '500',
                    changePrice: '',
                }]
            };
        },
        // methods:{
        //     handleChange(row, column, cell, price) {
        //         price.target.innerHTML = "";
        //         let cellInput = document.createElement("input");
        //         cellInput.value = "";
        //         cellInput.setAttribute("type", "text");
        //         cellInput.style.width = "60%";
        //         cell.appendChild(cellInput);
        //         cellInput.onblur = function () {
        //             cell.removeChild(cellInput);
        //             price.target.innerHTML = cellInput.value;
        //         };
        //     }
        //     }
    }
</script>

<style scoped>
    /**{*/
    /*box-sizing: border-box;*/
    /*}*/
    .page-title {
        margin: 25px 0;
        font-size: 24px;
        padding-left: 20px;
        letter-spacing: -1px;
        font-weight: 300;
    }

    .page-title small {
        color: #666;
        font-size: 14px;
        letter-spacing: 0;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;
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
        content: "";
        display: table;
        clear: both;
    }

    .caption i {
        margin-right: 5px;
        font-weight: 300;
    }

    .font-green {
        color: #32c5d2 !important;
    }

    .blod {
        font-weight: 700 !important;
        font-size: 16px;
    }

    .transfer-body {
        margin: 0;
        padding: 15px 0;
        border-bottom: 1px solid #efefef;
    }

    .el-col-5 {
        text-align: right;
        margin-bottom: 0;
        margin-top: 1px;
        padding-right: 15px;
        padding-top: 7px;
        font-weight: 400;
    }

    .btn-green {
        color: white;
        background-color: #32c5d2;
        border-color: #32c5d2;
    }

    .tansfer-action {
        padding: 20px 15px;
        text-align: center;
    }

    .portlet-body {
        padding: 8px 15px 0;
    }

    .table-body {
        border: 1px solid #e7ecf1;
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 10px 0 !important;
    }

    .table-action {
        text-align: center;
        padding-top: 10px;
        margin-bottom: 20px;
    }


</style>