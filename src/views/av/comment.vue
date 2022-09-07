<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="视频标题" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        删除选中({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleUpdateAll">
        通过选中({{ ids.length }})
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
      <el-table-column label="视频标题" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.text }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.reply }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论者" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>
            {{ row.nickname }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="点赞数" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.likes }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论IP" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.ip }}
          </el-tag>
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
          <el-button v-if="row.status !== 1" type="primary" size="mini" @click="handleUpdate(row)">
            通过
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { getCommentList, passComment, deleteComment } from '@/api/av'
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
          return '未审核'
        case 1:
          return '通过'
        default:
          return '拒绝'
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      ids: [],
      temp: {},
      statusOptions: ['未审核', '通过'],
      dialogFormVisible: false,
      dialogPlayerVisible: false,
      playData: {},
      myPlyer: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getCommentList(this.listQuery).then(response => {
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
      deleteComment({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleUpdateAll() {
      passComment({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '通过成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row, index) {
      var data = []
      data.push(row.id)
      passComment({ 'ids': data }).then(data => {
        this.$notify({
          title: 'Success',
          message: '通过成功',
          type: 'success',
          duration: 2000
        })
        this.list[index].status = 1
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteComment({ 'ids': data }).then(data => {
        this.$notify({
          title: 'Success',
          message: '彻底删除成功',
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
