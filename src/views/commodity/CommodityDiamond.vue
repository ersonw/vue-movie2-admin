<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索ID" style="width: 20vw;margin-right: 1vw" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="refresh">
        刷新
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        新建商品
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
      <el-table-column label="数量" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.diamond }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" min-width="60px">
        <template slot-scope="{row}">
          <span>￥{{ (row.amount / 100).toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建立时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ctime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.utime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTypeFilter">
            {{ row.status | statusFilter }}
          </el-tag>
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
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="控制开关">
            <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="temp.diamond" type="number" placeholder="整数量" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="temp.amount" type="number" placeholder="分制单位" />
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

    <el-dialog :visible.sync="dialogPvVisible" title="关联女优作品列表">
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
import PanThumb from '@/components/PanThumb'
import {
  addCommodityDiamond,
  deleteCommodityDiamond,
  getCommodityDiamondList,
  updateCommodityDiamond
} from '@/api/Commodity'
export default {
  // name: 'UsersList',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, PanThumb },
  directives: { waves },
  filters: {
    statusTypeFilter(status) {
      const statusMap = ['danger', 'success']
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = ['已禁用', '奔放中']
      return statusMap[status]
    },
    addTimeFilter(time) {
      if (time.indexOf('d') > -1 || time.indexOf('D') > -1) {
        return `${time.replace('d', '').replace('D')}天`
      } else if (time.indexOf('m') > -1 || time.indexOf('M') > -1) {
        return `${time.replace('m', '').replace('M')}月`
      } else if (time.indexOf('y') > -1 || time.indexOf('Y') > -1) {
        return `${time.replace('y', '').replace('Y')}年`
      }
    },
    durationFilter(t) {
      if (t < 60) {
        if (t < 10) {
          t = `0${t}`
        }
        return `00:00:${t}`
      } else {
        var s = t % 60
        if (s < 10) {
          s = `0${s}`
        }
        var m = Math.floor(t / 60)
        if (m < 60) {
          if (m < 10) {
            m = `0${m}`
          }
          return `00:${m}:${s}`
        } else {
          var h = Math.floor(m / 60)
          m = m % 60
          if (m < 10) {
            m = `0${m}`
          }
          if (h < 10) {
            h = `0${h}`
          }
          return `${h}:${m}:${s}`
        }
      }
    }
  },
  data() {
    return {
      user: null,
      classMap: [],
      actorMap: [],
      statusMap: ['已禁用', '奔放中'],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
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
      pvTotal: 0,
      listQueryPv: {
        page: 1,
        limit: 20,
        id: 0
      },
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
    refresh() {
      this.getList()
    },
    getList() {
      this.listLoading = true
      getCommodityDiamondList(this.listQuery).then(response => {
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
        status: 1,
        isText: 0
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
          const tempData = Object.assign({}, this.temp)
          tempData.amount = (tempData.amount * 100)
          addCommodityDiamond(tempData).then(() => {
            // this.list.unshift(this.temp)
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
      this.temp.amount = (this.temp.amount / 100).toFixed(2)
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
          tempData.amount = (tempData.amount * 100)
          // const data = { id: tempData.id, status: tempData.status, birthday: tempData.birthday, nickname: tempData.nickname, signature: tempData.signature }
          updateCommodityDiamond(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, tempData)
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
      this.$confirm('确定需要删除ID【' + row.id + '】吗？操作不可恢复!', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCommodityDiamond({ id: row.id }).then(() => {
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
