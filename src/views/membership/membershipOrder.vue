
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="订单号" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" style="margin-left: 1vw;" @click="makeupGameOrderAll">
        批量补单({{ ids.length }})
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户订单号" class-name="status-col" width="210">
        <template slot-scope="{row}">
          <span>{{ row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通道订单号" class-name="status-col" min-width="200">
        <template slot-scope="{row}">
          <span>{{ row.tradeNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开通天数" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.amount }}天
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赠送游戏币" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.gameCoin > 0?'success':'info'">
            {{ row.gameCoin }}个
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赠送会员经验值" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.experience > 0?'success':'info'">
            {{ row.experience }}点
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提交金额" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.price }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="实际支付" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.totalFee }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="充值用户" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值方式" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交IP" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status===1?'success':'info'">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status!==1" type="success" size="mini" @click="makeupGameOrder(row,$index)">
            补单
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getOrderList, deleteOrder, makeupOrder } from '@/api/membership'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      switch (status) {
        case 0:
          return '充值中'
        case 1:
          return '已成功'
        default:
          return '已删除'
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined
      },
      ids: [],
      temp: {},
      configs: [],
      dialogFormVisible: false,
      dialogStatus: 'create'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getOrderList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    makeupGameOrder(row, index) {
      var data = []
      data.push(row.id)
      makeupOrder({ 'ids': data }).then(response => {
        const { list } = response
        this.list.splice(index, 1, list[0])
        this.$notify({
          title: 'Success',
          message: '补单成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    makeupGameOrderAll() {
      makeupOrder({ 'ids': this.ids }).then(response => {
        const { list } = response
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
        this.$notify({
          title: 'Success',
          message: '补单成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleUser(row) {
      console.log(row)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        status: 1
      }
    },
    handleDeleteAll() {
      deleteOrder({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteOrder({ 'ids': data }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
