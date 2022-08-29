<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="视频标题" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        移除选中({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" style="margin-left: 1vw;" @click="handleCreate">
        新增
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
      <el-table-column label="分类标题" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-drawer size="72%" title="添加视频" :visible.sync="dialogFormVisible">
      <el-input v-model="listQuery.title" placeholder="视频标题" style="width: 300px;" class="filter-item" @keyup.enter.native="handleChildFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleChildFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="createData">
        添加选中({{ adds.length }})
      </el-button>
      <div style="margin: 1vw">
        <el-row>
          <el-tag v-for="(add, index) in adds" :key="index" type="success" style="margin: 9px">{{ add.title }}</el-tag>
        </el-row>
      </div>
      <el-table
        :key="childTableKey"
        v-loading="childLoading"
        :data="childList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @selection-change="handleSelectionChangeDialog"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type" @click="handlePlay(row)">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="唯一ID" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>
              {{ row.shareId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="分类" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <span>
              {{ row.class }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="付费" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag type="info">
              {{ row.price }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="点赞基数" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag type="info">
              {{ row.likes }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="播放基数" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag type="info">
              {{ row.plays }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="真实点赞" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag type="info">
              {{ row.like }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="真实播放" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag type="info">
              {{ row.play }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="childTotal>0" :total="childTotal" :page.sync="childQuery.page" :limit.sync="childQuery.limit" @pagination="getActiveList" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getActiveList, getConcentrationList, addConcentrationList, deleteConcentrationList } from '@/api/av'
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
      childTableKey: 0,
      list: null,
      childList: null,
      total: 0,
      childTotal: 0,
      listLoading: true,
      childLoading: true,
      childQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      ids: [],
      adds: [],
      dialogFormVisible: false,
      temp: {},
      id: 0
    }
  },
  created() {
    const { id } = this.$route.params
    // console.log(id)
    this.id = parseInt(id)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getConcentrationList(this.listQuery, this.id).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getActiveList() {
      this.childLoading = true
      getActiveList(this.childQuery, this.id).then(response => {
        this.childList = response.list
        this.childTotal = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.childLoading = false
        }, 1.5 * 1000)
      })
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleSelectionChangeDialog(selection) {
      this.adds = selection
    },
    handleList(row, index) {
      this.$router.push({ path: '/av/videoConcentration/' + row.id })
    },
    handleDeleteAll() {
      deleteConcentrationList({ 'ids': this.ids, 'id': this.id }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleChildFilter() {
      this.childQuery.page = 1
      this.getActiveList()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.getActiveList()
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteConcentrationList({ 'ids': data, 'id': this.id }).then(data => {
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
    },
    createData() {
      const ids = []
      for (const key in this.adds) {
        // console.log(this.adds[key])
        ids.push(this.adds[key].id)
      }
      addConcentrationList({ 'ids': ids, 'id': this.id }).then((data) => {
        // const index = this.list.findIndex(v => v.id === this.temp.id)
        const { list } = data
        // this.list.splice(0, 0, result)
        for (const lKey in list) {
          this.list.splice(0, 0, list[lKey])
        }
        // this.getList()
        this.adds = []
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '添加成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
