<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
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
import { getUserRobotList, deleteUser } from '@/api/users'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
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
      getUserRobotList(this.listQuery).then(response => {
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
    resetTemp() {
      this.temp = {
        id: undefined,
        status: 1
      }
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
