<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="搜索用户名" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="info" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleExpandAll">
        批量到期({{ ids.length }})
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
      <el-table-column label="用户名" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/user/userDetails/'+row.userId">
            <span class="link-type">{{ row.user }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="会员等级" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员经验值" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.experience }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开通订单数" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/membership/membershipListOrder/'+row.userId">
            <el-tag type="success">
              {{ row.orders }}
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="经验记录数" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/membership/membershipListExperience/'+row.userId">
            <el-tag type="success">
              {{ row.experiences }}
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="到期时间" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.expired > (new Date().getTime())? 'success':'info'">
            {{ row.expired | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开通时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="续费时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="primary" @click="handleExpand(row,$index)">
            强制到期
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
import { getMembershipList, deleteMembership, expiredMembership } from '@/api/membership'
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
        title: undefined
      },
      ids: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getMembershipList(this.listQuery).then(response => {
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
      deleteMembership({ 'ids': this.ids }).then(data => {
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
    handleExpandAll() {
      expiredMembership({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '批量强制到期成功',
          type: 'success',
          duration: 2000
        })
        const { list } = data
        for (let i = 0; i < list.length; i++) {
          const index = this.list.findIndex(v => v.id === list[i].id)
          this.list.splice(index, 1, list[i])
        }
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteMembership({ 'ids': data }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleExpand(row, index) {
      var data = []
      data.push(row.id)
      expiredMembership({ 'ids': data }).then(res => {
        this.$notify({
          title: 'Success',
          message: '强制到期成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1, res[0])
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
