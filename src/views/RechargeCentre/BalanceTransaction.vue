<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="ID" style="width: 20vw;margin-right: 1vw" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="搜索类型" clearable style="width: 10vw;margin-right: 1vw" class="filter-item">
        <el-option v-for="(item,index) in typeMap" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="订单状态" clearable style="width: 10vw;margin-right: 1vw" class="filter-item">
        <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="getList">
        刷新
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        手动充值
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
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="原因" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建立时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" min-width="50px">
        <template slot-scope="{row}">
          <el-tag>¥{{ row.amount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTypeFilter">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关联用户" min-width="50px">
        <template slot-scope="{row}">
          <el-tag><span class="link-type" @click="handleSearch(row.user.id)">{{ row.user.nickname || '无' }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='create'" label="用户ID" style="width: 36vw">
          <div class="el-row--flex">
            <el-input v-model="temp.uid" type="text" placeholder="输入用户ID" style="margin-right: .2vw" />
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="checkUser">
              检查
            </el-button>
            <el-tag> {{ user || '请先检查!' }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item v-if="dialogStatus==='create'" label="金额">
          <el-input v-model="temp.amount" type="text" placeholder="输入金额" />
        </el-form-item>
        <el-form-item label="交易状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="生成时间">
          <el-date-picker v-model="temp.add_time" type="datetime" placeholder="选择生成时间" />
        </el-form-item>
        <el-form-item label="原因">
          <el-input v-model="temp.reason" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="原因" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="上级信息">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column label="头像" align="center" width="150px">
          <template slot-scope="{row}">
            <pan-thumb :image="row.avatar || '/images/KV34RAJ9pn.png'" :height="'100px'" :width="'100px'" :hoverable="false" />
          </template>
        </el-table-column>
        <el-table-column label="昵称">
          <template slot-scope="{ row }">
            <el-tag><span class="link-type" @click="handleSearch(row.nickname)">{{ row.nickname }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="{ row }">
            <el-tag><span class="link-type" @click="handleSearch(row.phone)">{{ row.phone }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下属" min-width="150px">
          <template slot-scope="{row}">
            <el-tag><span class="link-type" @click="handleFetchPv(row.id)">{{ row.share }}</span></el-tag>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { getShare, getSuperior } from '@/api/users' // secondary package based on el-pagination
import PanThumb from '@/components/PanThumb'
import { addBalance, checkUser, deleteBalance, getBalanceList, updateBalance } from '@/api/RechargeCentre'
export default {
  // name: 'UsersList',
  components: { Pagination, PanThumb },
  directives: { waves },
  filters: {
    statusTypeFilter(status) {
      const statusMap = ['info', 'success', 'danger']
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = ['交易中', '交易成功', '交易失败']
      return statusMap[status]
    },
    typeFilter(type) {
      // return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      user: null,
      statusMap: ['交易中', '交易成功', '交易失败'],
      typeMap: ['订单ID', '用户ID'],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        id: undefined,
        type: 0,
        sort: '-id'
      },
      temp: {
        status: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkUser() {
      checkUser({ id: this.temp.uid }).then(res => {
        this.user = res.data.user
      })
    },
    handleSearch(t) {
      this.listQuery.page = 1
      this.listQuery.type = 1
      this.listQuery.id = t
      this.getList()
    },
    getList() {
      this.listLoading = true
      getBalanceList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total

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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        status: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          addBalance(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
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
          tempData.add_time = (new Date(tempData.add_time)).getTime()
          // const data = { id: tempData.id, status: tempData.status, birthday: tempData.birthday, nickname: tempData.nickname, signature: tempData.signature }
          updateBalance(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定需要删除订单ID【' + row.id + '】吗？操作不可恢复!', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBalance({ id: row.id }).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
      // this.list.splice(index, 1)
    },
    handleSuperior(id) {
      getSuperior({ id }).then(res => {
        this.pvData = res.data.list
        this.dialogPvVisible = true
      })
    },
    handleFetchPv(id) {
      getShare({ id }).then(res => {
        this.pvData = res.data.list
        this.dialogPvVisible = true
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
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
