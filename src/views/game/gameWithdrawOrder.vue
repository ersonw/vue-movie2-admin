
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="订单号" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-checkbox v-model="listQuery.enabled" class="filter-item" style="margin-left:15px;" @change="handleFilter">
        未审核
      </el-checkbox>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleMakeDownAll">
        批量退回({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" style="margin-left: 1vw;" @click="makeupGameOrderAll">
        批量成功({{ ids.length }})
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
      <!--      <el-table-column label="通道订单号" class-name="status-col" min-width="200">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span>{{ row.tradeNo }}</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="提现金额" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.amount }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="手续费" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.fee }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="建议支付" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="danger">
            {{ row.totalFee }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="提现用户" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.user }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="总充值" class-name="status-col" width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span class="link-type">{{ row.allIn }}元</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="总提现" class-name="status-col" width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span class="link-type">{{ row.allOut }}元</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="今日充值" class-name="status-col" width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span class="link-type">{{ row.toDayIn }}元</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column label="今日提现" class-name="status-col" width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          <span class="link-type">{{ row.toDayOut }}元</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="游戏流水" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.water }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="未提现充值" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.recentIn }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="提交IP" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
          <el-button v-if="row.status===0" type="success" size="mini" @click="makeupGameOrder(row,$index)">
            成功提现
          </el-button>
          <el-button v-if="row.status===0" size="mini" type="danger" @click="makeDownGameWithdrawOrder(row,$index)">
            退回并失败
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-drawer size="40%" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" style="width: 90%; margin-left:50px;">
        <el-form-item label="充值面额">
          <el-input v-model="temp.amount" type="number" />
        </el-form-item>
        <el-form-item label="实际支付(元)">
          <el-input v-model="temp.price" type="number" />
        </el-form-item>
        <el-form-item label="充值优惠">
          <el-switch
            v-model="temp.less"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="指定充值通道">
          <el-select v-model="temp.cashInId" class="filter-item" placeholder="选择充值通道" @change="getButtonConfig">
            <el-option v-for="(item, index) in configs" :key="index" :label="item.title" :value="item.id" :aria-label="item.title" :disabled="item.status!==1" />
          </el-select>
        </el-form-item>
        <el-form-item label="可用支付方式">
          <el-tag type="success">{{ temp.typeStr }}</el-tag>
        </el-form-item>
        <el-form-item label="上线按钮">
          <el-switch
            v-model="temp.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-button @click="makeDownGameWithdrawOrder(temp)">
          退回资金并且失败
        </el-button>
        <el-button type="primary" @click="makeupGameOrder(temp)">
          提现成功
        </el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getGameWithdrawOrder, makeDownGameWithdrawOrder, makeupGameWithdrawOrder } from '@/api/game'
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
          return '审核中'
        case 1:
          return '已成功'
        default:
          return '已失败'
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
        enabled: true,
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
      getGameWithdrawOrder(this.listQuery).then(response => {
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
      makeupGameWithdrawOrder({ 'ids': data }).then(response => {
        const { list } = response
        this.list.splice(index, 1, list[0])
        this.$notify({
          title: 'Success',
          message: '提现成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    makeupGameOrderAll() {
      makeupGameWithdrawOrder({ 'ids': this.ids }).then(response => {
        const { list } = response
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
        this.$notify({
          title: 'Success',
          message: '批量提现成功',
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
    handleMakeDownAll() {
      makeDownGameWithdrawOrder({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '批量拒绝成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    makeDownGameWithdrawOrder(row, index) {
      var data = []
      data.push(row.id)
      makeDownGameWithdrawOrder({ 'ids': data }).then(data => {
        this.$notify({
          title: 'Success',
          message: '拒绝成功',
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
