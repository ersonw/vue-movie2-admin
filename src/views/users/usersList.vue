<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="用户名或手机号或昵称" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="info" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="freezeAll">
        批量冻结({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="unfreezeAll">
        批量解除冻结({{ ids.length }})
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
      <el-table-column label="用户名" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个性签名" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像地址" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.avatar }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册IP" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.registerIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总充值" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.in }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="游戏提现" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.gameOut }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="已付费视频数" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.pays }}条
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="短视频数" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <router-link :to="'/shortVideo/shortVideoUser/'+row.id">
            <span class="link-type">{{ row.short }}条</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="加入时间" width="150px" align="center">
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
          <el-tag type="info">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="unfreezeData(row,$index)">
            解除冻结
          </el-button>
          <el-button size="mini" type="info" @click="freezeData(row,$index)">
            强制冻结
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            彻底删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getUserList, deleteUser, freezeUser, unfreezeUser } from '@/api/users'
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
          return '正常使用'
        default:
          return '已冻结'
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
      getUserList(this.listQuery).then(response => {
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
    freezeData(row, index) {
      var data = []
      data.push(row.id)
      freezeUser({ 'ids': data }).then((data) => {
        const { list } = data
        this.list.splice(index, 1, list[0])
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '冻结成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    freezeAll() {
      freezeUser({ 'ids': this.ids }).then(data => {
        const { list } = data
        this.$notify({
          title: 'Success',
          message: '批量冻结成功',
          type: 'success',
          duration: 2000
        })
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
        this.ids = []
      })
    },
    unfreezeData(row, index) {
      var data = []
      data.push(row.id)
      unfreezeUser({ 'ids': data }).then((data) => {
        const { list } = data
        this.list.splice(index, 1, list[0])
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '解除冻结成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    unfreezeAll() {
      unfreezeUser({ 'ids': this.ids }).then(data => {
        const { list } = data
        this.$notify({
          title: 'Success',
          message: '批量解除冻结成功',
          type: 'success',
          duration: 2000
        })
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
        this.ids = []
      })
    },
    handleDeleteAll() {
      deleteUser({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '批量删除成功',
          type: 'success',
          duration: 2000
        })
        for (let i = 0; i < this.ids.length; i++) {
          const index = this.list.findIndex(v => v.id === this.ids[i])
          this.list.splice(index, 1)
        }
        this.ids = []
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteUser({ 'ids': data }).then(data => {
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
