<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start" type="date" placeholder="选择开始日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-date-picker v-model="listQuery.end" type="date" placeholder="选择结束日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
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
      <el-table-column label="用户ID" width="80">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开通天数" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.amount }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赠送游戏币" min-width="150px">
        <template slot-scope="{row}">
          <el-tag :type="row.gameCoin>0?'success':'info'">
            {{ row.gameCoin }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="添加经验值" min-width="150px">
        <template slot-scope="{row}">
          <el-tag :type="row.experience>0?'success':'info'">
            {{ row.experience }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开通备注" min-width="100">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开通时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getMembershipListOrder, deleteMembershipListOrder } from '@/api/membership'
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
          return '未启用'
        case 1:
          return '已启用'
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
        id: 0,
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
      getMembershipListOrder(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleDeleteAll() {
      deleteMembershipListOrder({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '批量删除成功',
          type: 'success',
          duration: 2000
        })
        for (let i = 0; i < this.ids; i++) {
          this.list.splice(this.ids[i], 1)
        }
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteMembershipListOrder({ 'ids': data }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    dateChange() {},
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
