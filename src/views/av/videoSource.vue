<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        删除选中({{ ids.length }})
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
      <el-table-column label="推荐标题" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/av/videoSource/'+row.id">
            <span class="link-type">{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="总计" min-width="150px">
        <template slot-scope="{row}">
          <router-link :to="'/av/videoSource/'+row.id">
            <el-tag type="success">
              {{ row.count }}
            </el-tag>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" align="center">
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
          <el-button size="mini" type="primary" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog title="类名" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="temp.name" type="textarea" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="选择标签状态">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="temp.id === undefined?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getVideoSource, deleteVideoSource, addVideoSource, updateVideoSource } from '@/api/av'
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
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      ids: [],
      dialogFormVisible: false,
      temp: {},
      statusOptions: ['禁用', '启用']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getVideoSource(this.listQuery).then(response => {
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
    handleList(row, index) {
      this.$router.push({ path: '/av/videoConcentration/' + row.id })
    },
    handleDeleteAll() {
      deleteVideoSource({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
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
    handleCreate() {
      this.temp = {}
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      // console.log(this.temp)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteVideoSource({ 'ids': data }).then(data => {
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          addVideoSource(tempData).then((data) => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            const { result } = data
            this.list.splice(0, 0, result)
            // this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateVideoSource(tempData).then((data) => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            const { result } = data
            this.list.splice(index, 1, result)
            // this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
