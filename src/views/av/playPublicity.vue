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
      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{row}">
          <el-link :href="row.image" target="_blank">
            <span class="link-type">{{ row.name }}</span>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="跳转链接" min-width="150px">
        <template slot-scope="{row}">
          <el-link :href="row.url" target="_blank">
            <span class="link-type">{{ row.url }}</span>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="反馈统计" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.count }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="显示页面" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.page | pageFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="跳转类型" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.type | typeFilter }}
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
    <el-drawer size="60%" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 80%; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="temp.name" type="textarea" />
        </el-form-item>
        <el-form-item label="图片地址">
          <el-input v-model="temp.image" type="textarea" />
        </el-form-item>
        <el-form-item label="跳转地址">
          <el-input v-model="temp.url" type="textarea" />
        </el-form-item>
        <el-form-item label="显示页面">
          <el-select v-model="temp.page" class="filter-item" placeholder="选择">
            <el-option v-for="(item, index) in pageOptions" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转类型">
          <el-select v-model="temp.type" class="filter-item" placeholder="选择">
            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="选择标签状态">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="temp.id === undefined?createData():updateData()">
          确认
        </el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getPlayPublicity, deletePlayPublicity, addPlayPublicity, updatePlayPublicity } from '@/api/av'
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
    },
    typeFilter(type) {
      switch (type) {
        case 0:
          return '打开外部浏览器'
        case 1:
          return '打开内部浏览器'
        case 2:
          return '打开视频'
        // case 3:
        //   return '打开内部接口'
        default:
          return '未知'
      }
    },
    pageFilter(page) {
      switch (page) {
        case 0:
          return '未指定'
        case 1:
          return '视频播放页'
        // case 2:
        //   return '打开视频'
        // case 3:
        //   return '打开内部接口'
        default:
          return '未知'
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
      statusOptions: ['禁用', '启用'],
      pageOptions: ['不指定', '视频播放页'],
      typeOptions: ['打开外部浏览器', '打开内部浏览器', '打开视频']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPlayPublicity(this.listQuery).then(response => {
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
      deletePlayPublicity({ 'ids': this.ids }).then(data => {
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
      deletePlayPublicity({ 'ids': data }).then(data => {
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
          tempData.url1 = tempData.url
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          addPlayPublicity(tempData).then((data) => {
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
          tempData.url1 = tempData.url
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updatePlayPublicity(tempData).then((data) => {
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
