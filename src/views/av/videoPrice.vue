<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="视频标题" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量取消({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handlePriceAll">
        批量修改({{ ids.length }})
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
          <span class="link-type">{{ row.title }}</span>
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
      <el-table-column label="价格" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.price }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改价格
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            取消付费
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="付费价格">
          <el-input v-model="temp.price" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="收费信息" :visible.sync="dialogPriceVisible">
      <el-form ref="dataForm1" :model="price" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="统一价格">
          <el-input v-model="price" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPriceVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handlePriceData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deletePrice, getPriceList, updatePrice } from '@/api/av'
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
      temp: {},
      price: 0,
      statusOptions: ['禁用', '启用'],
      dialogFormVisible: false,
      dialogPriceVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getPriceList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handlePriceAll() {
      this.dialogPriceVisible = true
      // this.price = 0
      this.$nextTick(() => {
        this.$refs['dataForm1'].clearValidate()
      })
    },
    handlePriceData() {
      updatePrice({ 'ids': this.ids, 'amount': this.price }).then(data => {
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        this.dialogPriceVisible = false
        this.price = 0
        this.getList()
      })
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.pid)
    },
    handleDeleteAll() {
      deletePrice({ 'ids': this.ids }).then(data => {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      var data = []
      data.push(this.temp.pid)
      updatePrice({ 'ids': data, 'amount': this.temp.price }).then(data => {
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.pid)
      deletePrice({ 'ids': data }).then(data => {
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
