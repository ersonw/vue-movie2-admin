<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" :placeholder="typeOptions[listQuery.type]" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="查询类型" clearable style="argin-left: 1vw;" class="filter-item" min-width="80">
        <el-option v-for="(item,index) in typeOptions" :key="index" :label="item" :value="index" />
      </el-select>
      <el-date-picker v-model="listQuery.start" type="date" placeholder="选择开始日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-date-picker v-model="listQuery.end" type="date" placeholder="选择结束日期" style="margin-left: 1vw;" clearable value-format="timestamp" @change="dateChange" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
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
      <el-table-column label="用户昵称" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.id">
            <span class="link-type">{{ row.nickname }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.id">
            <span class="link-type">{{ row.username }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.id">
            <span class="link-type">{{ row.phone }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="总共消费" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.all }}
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
      <el-table-column label="代理分佣" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.id">
            <el-tag :type="row.agent>0?'success':'info'">
              {{ row.agent }}
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="消费记录" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <router-link :to="'/users/usersConsumeUser/'+row.id">
            <el-tag :type="row.records>0?'success':'info'">
              {{ row.records }}
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getUsersConsumeList } from '@/api/users'
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
        type: 0,
        start: undefined,
        end: undefined,
        title: undefined
      },
      typeOptions: ['用户ID', '用户昵称', '用户名', '手机号码']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUsersConsumeList(this.listQuery).then(response => {
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
    dateChange() {},
    resetTemp() {
      this.temp = {
        id: undefined,
        status: 1
      }
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
