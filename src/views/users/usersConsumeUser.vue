<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start" type="date" placeholder="选择开始日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-date-picker v-model="listQuery.end" type="date" placeholder="选择结束日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="makeDownConsumeListUserAll">
        批量冻结({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="makeupConsumeListUserAll">
        批量恢复({{ ids.length }})
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
      <el-table-column label="用户ID" width="80">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费备注" width="80">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费金额" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.amount }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="上级分佣" min-width="150px">
        <template slot-scope="{row}">
          <el-tag :type="row.users>0?'success':'info'">
            {{ row.users }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="代理分佣" min-width="150px">
        <template slot-scope="{row}">
          <el-tag :type="row.agent>0?'success':'info'">
            {{ row.agent }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
          <el-button v-if="row.status!==1" size="mini" type="primary" @click="makeupConsumeListUser(row,$index)">
            恢复返利
          </el-button>
          <el-button v-if="row.status>0" type="danger" @click="makeDownConsumeListUser(row,$index)">
            取消返利
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getUsersConsumeListUser, makeupConsumeListUser, makeDownConsumeListUser } from '@/api/users'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      switch (status) {
        case 0:
          return '系统冻结'
        case 1:
          return '生效中'
        default:
          return '后台冻结'
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
        start: undefined,
        end: undefined
      },
      ids: []
    }
  },
  created() {
    const { id } = this.$route.params
    // console.log(id)
    this.listQuery.id = parseInt(id)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUsersConsumeListUser(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    dateChange() {},
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleOpen(row, index) {
      window.open(row.detailUrl, '_blank')
    },
    makeupConsumeListUser(row, index) {
      var data = []
      data.push(row.id)
      makeupConsumeListUser({ 'ids': data, 'id': this.listQuery.id }).then((res) => {
        const { list } = res
        this.list.splice(index, 1, list[0])
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '恢复返利成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    makeupConsumeListUserAll() {
      makeupConsumeListUser({ 'ids': this.ids, 'id': this.listQuery.id }).then((res) => {
        const { list } = res
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '批量恢复返利成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    makeDownConsumeListUser(row, index) {
      var data = []
      data.push(row.id)
      makeDownConsumeListUser({ 'ids': data, 'id': this.listQuery.id }).then((res) => {
        const { list } = res
        this.list.splice(index, 1, list[0])
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '取消返利成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    makeDownConsumeListUserAll() {
      makeDownConsumeListUser({ 'ids': this.ids, 'id': this.listQuery.id }).then((res) => {
        const { list } = res
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '批量取消返利成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
