<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="listQuery.enabled?'用户ID':'用户手机号'" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-checkbox v-model="listQuery.enabled" class="filter-item" style="margin-left:15px;">
        查找用户ID
      </el-checkbox>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
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
      <el-table-column label="姓名" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="卡号" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.card }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.bank }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开户行" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加IP" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.addIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新IP" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.updateIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-drawer size="40%" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" style="width: 90%; margin-left:50px;">
        <el-form-item label="姓名">
          <el-input v-model="temp.name" type="text" />
        </el-form-item>
        <el-form-item label="银行">
          <el-input v-model="temp.bank" type="text" />
        </el-form-item>
        <el-form-item label="卡号">
          <el-input v-model="temp.card" type="number" />
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model="temp.address" type="text" />
        </el-form-item>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getGameWithdrawCard, deleteGameWithdrawCard, updateGameWithdrawCard } from '@/api/game'
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
          return '未上线'
        case 1:
          return '已上线'
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
        enabled: false,
        title: undefined
      },
      ids: [],
      temp: {},
      statusOptions: ['下线游戏', '上线游戏'],
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
      getGameWithdrawCard(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateGameWithdrawCard(tempData).then((data) => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, data)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDeleteAll() {
      deleteGameWithdrawCard({ 'ids': this.ids }).then(data => {
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
      deleteGameWithdrawCard({ 'ids': data }).then(data => {
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
