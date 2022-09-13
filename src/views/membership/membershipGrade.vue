<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="名称" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" style="margin-left: 1vw;" @click="handleCreate">
        添加
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
      <el-table-column label="权益名称" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员背景" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleOpen(row.icon)">{{ row.icon }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最小等级" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="success">
            LV.{{ row.mini }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最大等级" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <el-tag type="success">
            LV.{{ row.max }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="等级权益" class-name="status-col" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.benefits }}</span>
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
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-drawer size="40%" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <el-form ref="dataForm" :model="temp" label-position="left" style="width: 90%; margin-left:50px;">
        <el-form-item label="等级名称">
          <el-input v-model="temp.name" type="text" />
        </el-form-item>
        <el-form-item label="会员背景">
          <el-input v-model="temp.icon" type="textarea" placeholder="留空系统默认" />
        </el-form-item>
        <el-form-item label="最小等级">
          <el-input v-model="temp.mini" type="number" />
        </el-form-item>
        <el-form-item label="最大等级">
          <el-input v-model="temp.max" type="number" />
        </el-form-item>
        <el-form-item label="会员权益">
          <el-checkbox-group v-model="temp.options" class="a-row" @change="handleCheckedCitiesChange($event)">
            <el-checkbox v-for="(item) in benefitOptions" :key="item.id" :label="item.id" class="filter-item" style="margin-left:15px;">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上线等级">
          <el-switch
            v-model="temp.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-button @click="dialogFormVisible = false && resetTemp()">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getBenefitList, getGradeList, deleteGrade, updateGrade, addGrade } from '@/api/membership'
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
        title: undefined
      },
      ids: [],
      temp: {
        options: []
      },
      benefitOptions: [],
      dialogFormVisible: false,
      dialogStatus: 'create'
    }
  },
  created() {
    this.getList()
    this.getBenefitList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getGradeList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getBenefitList() {
      getBenefitList({ limit: 60, page: 1 }).then(res => {
        const { list } = res
        this.benefitOptions = list
      })
    },
    handleCheckedCitiesChange(value) {
      this.temp.options = value
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleUser(row) {
      console.log(row)
    },
    beforeClose(hide) {
      this.resetTemp()
      hide()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        options: [],
        status: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addGrade(this.temp).then((data) => {
            // this.list.splice(0, 0, data)
            this.list.unshift(data)
            this.dialogFormVisible = false
            this.resetTemp()
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
    handleOpen(url) {
      window.open(url, '_blank')
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateGrade(tempData).then((data) => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, data)
            this.dialogFormVisible = false
            this.resetTemp()
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDeleteAll() {
      deleteGrade({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteGrade({ 'ids': data }).then(data => {
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
    }
  }
}
</script>
