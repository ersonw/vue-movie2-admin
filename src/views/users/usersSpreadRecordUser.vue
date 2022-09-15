<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start" type="date" placeholder="选择开始日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-date-picker v-model="listQuery.end" type="date" placeholder="选择结束日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="deleteUsersSpreadRecordUserListAll">
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
      <el-table-column label="用户昵称" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersSpreadRecordUser/'+row.userId">
            <span class="link-type">{{ row.nickname }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersSpreadRecordUser/'+row.userId">
            <span class="link-type">{{ row.username }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersSpreadRecordUser/'+row.userId">
            <span class="link-type">{{ row.phone }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="注册IP" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.registerIP }}</span>
        </template>
      </el-table-column>
      <el-table-column label="直属下线" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersSpreadRecordUser/'+row.userId">
            <el-tag :type="row.record>0?'success':'info'">
              {{ row.record }}个
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="用户消费" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.userId">
            <el-tag :type="row.consume>0?'success':'info'">
              {{ row.consume }}元
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="下线产生收益" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.userId">
            <el-tag :type="row.rebate>0?'success':'info'">
              {{ row.rebate }}元
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="deleteUsersSpreadRecordUserList(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getUsersSpreadRecordUserList, deleteUsersSpreadRecordUserList } from '@/api/users'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
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
      getUsersSpreadRecordUserList(this.listQuery).then(response => {
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
    deleteUsersSpreadRecordUserList(row, index) {
      var data = []
      data.push(row.id)
      deleteUsersSpreadRecordUserList({ 'ids': data, 'id': this.listQuery.id }).then((res) => {
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
    deleteUsersSpreadRecordUserListAll() {
      deleteUsersSpreadRecordUserList({ 'ids': this.ids, 'id': this.listQuery.id }).then((res) => {
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
