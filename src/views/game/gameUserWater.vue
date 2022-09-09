<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="listQuery.start" type="date" placeholder="选择开始日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-date-picker v-model="listQuery.end" type="date" placeholder="选择结束日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-refresh" style="margin-left: 1vw;" @click="updateGameWater">
        手动同步
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
    >
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
      <el-table-column label="游戏名称" width="80">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleOpen(row)">{{ row.game }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统盈亏" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-tag :type="row.profit>0?'success':'danger'">
            {{ row.profit }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="有效投注" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.tax }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="游戏税收" min-width="150px">
        <template slot-scope="{row}">
          <el-tag :type="row.tax>0?'success':'info'">
            {{ row.tax }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="结算余额" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.balance }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="记录ID" min-width="100">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleOpen(row)">{{ row.recordId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.recordTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="同步时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleOpen(row,$index)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getGameWater, updateGameWater } from '@/api/game'
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
        start: undefined,
        end: undefined
      },
      id: 0
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
      getGameWater(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    dateChange() {},
    handleOpen(row, index) {
      window.open(row.detailUrl, '_blank')
    },
    updateGameWater() {
      updateGameWater().then(() => {
        this.$notify({
          title: 'Success',
          message: '同步成功',
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
