<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="按钮金额" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-plus" style="margin-left: 1vw;" @click="handleCreate">
        添加按钮
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
      <el-table-column label="开通天数" min-width="100">
        <template slot-scope="{row}">
          <el-tag type="success">
            {{ row.amount }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="原价" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.original === row.price?'success':'info'">
            {{ row.original }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优惠价" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.price < row.original?'success':'info'">
            {{ row.price }}元
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赠送游戏币" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.gameCoin > 0?'success':'info'">
            {{ row.gameCoin }}个
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赠送会员经验值" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.experience > 0?'success':'info'">
            {{ row.experience }}点
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="充值通道" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.cashIn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值方式" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.typeStr }}</span>
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
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status===1?'success':'info'">
            {{ row.status | statusFilter }}
          </el-tag>
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

    <el-drawer size="40%" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" style="width: 90%; margin-left:50px;">
        <el-form-item label="开通天数">
          <el-input v-model="temp.amount" type="number" />
        </el-form-item>
        <el-form-item label="原价(元)">
          <el-input v-model="temp.original" type="number" />
        </el-form-item>
        <el-form-item label="优惠价格(元)">
          <el-input v-model="temp.price" type="number" />
        </el-form-item>
        <el-form-item label="赠送游戏币(个)">
          <el-input v-model="temp.gameCoin" type="number" />
        </el-form-item>
        <el-form-item label="赠送会员经验值(点)">
          <el-input v-model="temp.experience" type="number" />
        </el-form-item>
        <el-form-item label="指定充值通道">
          <el-select v-model="temp.cashInId" class="filter-item" placeholder="选择充值通道" @change="getButtonConfig">
            <el-option v-for="(item, index) in configs" :key="index" :label="item.title" :value="item.id" :aria-label="item.title" :disabled="item.status!==1" />
          </el-select>
        </el-form-item>
        <el-form-item label="可用支付方式">
          <el-tag type="success">{{ temp.typeStr }}</el-tag>
        </el-form-item>
        <el-form-item label="上线按钮">
          <el-switch
            v-model="temp.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-button @click="dialogFormVisible = false">
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
import { getButtonConfigList, getButtonConfig } from '@/api/game'
import { getButtonList, deleteButton, updateButton, addButton } from '@/api/membership'
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
    },
    lessFilter(status) {
      switch (status) {
        case 0:
          return '未优惠'
        case 1:
          return '已优惠'
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
      temp: {},
      configs: [],
      dialogFormVisible: false,
      dialogStatus: 'create'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getButtonList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getButtonConfigList() {
      getButtonConfigList().then(data => {
        const { list } = data
        this.configs = [
          {
            id: 0,
            title: '不指定充值通道',
            status: 1
          }
        ]
        for (let i = 0; i < list.length; i++) {
          this.configs.push(list[i])
        }
      })
    },
    getButtonConfig() {
      getButtonConfig(this.temp.cashInId).then(data => {
        const { result } = data
        this.temp.typeStr = result
      })
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
    resetTemp() {
      this.temp = {
        id: undefined,
        status: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.getButtonConfigList()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addButton(this.temp).then((data) => {
            // this.list.splice(0, 0, data)
            this.list.unshift(data)
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
    handleUpdate(row) {
      this.getButtonConfigList()
      this.temp = Object.assign({}, row) // copy obj
      this.getButtonConfig()
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
          updateButton(tempData).then((data) => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, data)
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
    },
    handleDeleteAll() {
      deleteButton({ 'ids': this.ids }).then(data => {
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
      deleteButton({ 'ids': data }).then(data => {
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
