<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="用户昵称或者手机号或UID" style="width: 20vw;margin-right: 1vw" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="用户状态" clearable style="width: 10vw;margin-right: 1vw" class="filter-item">
        <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="getList">
        刷新
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
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="120px">
        <template slot-scope="{row}">
          <pan-thumb :image="row.avatar || '/images/KV34RAJ9pn.png'" :height="'100px'" :width="'100px'" :hoverable="false" />
        </template>
      </el-table-column>
      <el-table-column label="背景" align="center" width="120px">
        <template slot-scope="{row}">
          <el-image :src="row.bk_image || '/images/defaultwal_YkXkQnM0.jpg'" />
        </template>
      </el-table-column>
      <el-table-column label="昵称" min-width="100px">
        <template slot-scope="{row}">
          <!--          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>-->
          <!--          <el-tag>{{ row.nickname | typeFilter }}</el-tag>-->
          <el-tag>{{ row.nickname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="签名" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.signature }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="50px">
        <template slot-scope="{row}">
          <span v-if="row.sex === 1">女</span>
          <span v-if="row.sex === 0">男</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.birthday | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建立时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ctime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.utime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金币" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.gold }}币</span>
        </template>
      </el-table-column>
      <el-table-column label="钻石" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.diamond }}钻石</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" min-width="100px">
        <template slot-scope="{row}">
          <el-tag>¥{{ row.balance }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusTypeFilter">
            {{ row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邀请码" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.invite }}</span>
        </template>
      </el-table-column>
      <el-table-column label="被关注" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.follws }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备ID" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.identifier }}</span>
        </template>
      </el-table-column>
      <el-table-column label="找回UID" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级" min-width="100px">
        <template slot-scope="{row}">
          <el-tag><span class="link-type" @click="handleSuperior(row.id)">{{ row.superior }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下属" min-width="50px">
        <template slot-scope="{row}">
          <el-tag><span class="link-type" @click="handleFetchPv(row.id)">{{ row.share }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="VIP过期时间" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.expireds | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="temp.birthday" placeholder="选择生日" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="temp.nickname" />
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="temp.signature" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.reason" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="上级信息">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column label="头像" align="center" width="150px">
          <template slot-scope="{row}">
            <pan-thumb :image="row.avatar || '/images/KV34RAJ9pn.png'" :height="'100px'" :width="'100px'" :hoverable="false" />
          </template>
        </el-table-column>
        <el-table-column label="昵称">
          <template slot-scope="{ row }">
            <el-tag><span class="link-type" @click="handleSearch(row.nickname)">{{ row.nickname }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="{ row }">
            <el-tag><span class="link-type" @click="handleSearch(row.phone)">{{ row.phone }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下属" min-width="150px">
          <template slot-scope="{row}">
            <el-tag><span class="link-type" @click="handleFetchPv(row.id)">{{ row.share }}</span></el-tag>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { del, getList, getShare, getSuperior, update } from '@/api/users' // secondary package based on el-pagination
import PanThumb from '@/components/PanThumb'
export default {
  // name: 'UsersList',
  components: { Pagination, PanThumb },
  directives: { waves },
  filters: {
    statusTypeFilter(status) {
      const statusMap = ['danger', 'success']
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = ['禁用', '启用']
      return statusMap[status]
    },
    typeFilter(type) {
      // return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      statusMap: ['禁用', '启用'],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        sort: '+id'
      },
      temp: {
        status: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSearch(t) {
      this.listQuery.page = 1
      this.listQuery.title = t
      this.getList()
    },
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total

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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          tempData.birthday = (new Date(tempData.birthday)).getTime()
          const data = { id: tempData.id, status: tempData.status, birthday: tempData.birthday, nickname: tempData.nickname, signature: tempData.signature, reason: tempData.reason }
          update(data).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定需要删除用户【' + row.nickname + '】吗？操作不可恢复!', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id: row.id }).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
      // this.list.splice(index, 1)
    },
    handleSuperior(id) {
      getSuperior({ id }).then(res => {
        this.pvData = res.data.list
        this.dialogPvVisible = true
      })
    },
    handleFetchPv(id) {
      getShare({ id }).then(res => {
        this.pvData = res.data.list
        this.dialogPvVisible = true
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
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
