<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="ID或者姓名" style="width: 20vw;margin-right: 1vw" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="init">
        刷新
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">
        新建演员
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
      <el-table-column label="展开" type="expand" width="100px">
        <template v-slot="slot">
          <el-table :data="slot.row.videos.list">
            <el-table-column prop="id" label="ID" align="center" />
            <el-table-column prop="title" label="标题" align="center" />
            <el-table-column label="封面" align="center" min-width="50px">
              <template slot-scope="{row}">
                <el-image :src="row.picThumb" />
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
              <template slot-scope="{row}">
                <el-button size="mini" type="danger" @click="handleRemoveVideo(row)">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="slot.row.videos.total>0" :total="slot.row.videos.total" :page.sync="listQueryVideo.page" :limit.sync="listQueryVideo.limit" @pagination="getActorVideoList(slot.row.videos)" />
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作品" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.videos.total }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名字" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center" min-width="120px">
        <template slot-scope="{row}">
          <pan-thumb :image="row.avatar" :height="'100px'" :width="'100px'" :hoverable="false" />
        </template>
      </el-table-column>
      <el-table-column label="三围" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag>
            {{ row.measurements | measurementsFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="收藏量" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.collects }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建立时间" width="150px" align="center">
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
          <el-tag :type="row.status | statusTypeFilter">
            {{ row.status | statusFilter }}
          </el-tag>
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
          <el-select v-model="temp.status" class="filter-item" placeholder="控制开关">
            <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <pan-thumb v-if="temp.avatar !== null && temp.avatar !==undefined && temp.avatar !== ''" :image="temp.avatar" :height="'100px'" :width="'100px'" :hoverable="false" />
          <el-input v-model="temp.avatar" type="text" placeholder="头像链接" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="temp.name" type="text" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="三围">
          <el-select v-model="temp.measurements" class="filter-item" placeholder="三围">
            <el-option v-for="(item) in measurementsMap" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="影视名">
          <span>{{ temp.videos.list | recordsFilter }}</span>
          <br>
          <el-button type="primary" @click="handleSearch">添加视频</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="视频列表">
      <el-input v-model="listQueryPv.title" placeholder="ID或者标题" style="width: 20vw;margin-right: 1vw" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
        搜索
      </el-button>
      <el-table :data="pvData">
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column prop="title" label="标题" align="center" />
        <el-table-column label="封面" align="center" min-width="50px">
          <template slot-scope="{row}">
            <el-image :src="row.picThumb" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="mini" type="primary" @click="handleAddRecord(row)">
              添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="pvTotal>0" :total="pvTotal" :page.sync="listQueryPv.page" :limit.sync="listQueryPv.limit" @pagination="handleSearch" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import PanThumb from '@/components/PanThumb'
import {
  getMeasurements,
  getActorList,
  addActor, updateActor, deleteActor, getActorVideoList, removeActorVideo, getUnActorVideos
} from '@/api/videos'
let measurementsMap = []
export default {
  // name: 'UsersList',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, PanThumb },
  directives: { waves },
  filters: {
    statusTypeFilter(status) {
      const statusMap = ['danger', 'success']
      return statusMap[status]
    },
    statusFilter(status) {
      const statusMap = ['已禁用', '奔放中']
      return statusMap[status]
    },
    recordsFilter(records) {
      // console.log(records)
      if (typeof (records) !== 'undefined') {
        var str = ''
        for (const element of records) {
          str += element.title + '======'
        }
        return str
      } else {
        return ''
      }
    },
    measurementsFilter(type) {
      for (let i = 0; i < measurementsMap.length; i++) {
        if (measurementsMap[i].id === type) {
          return measurementsMap[i].title
        }
      }
      return '?罩杯'
    },
    durationFilter(t) {
      if (t < 60) {
        if (t < 10) {
          t = `0${t}`
        }
        return `00:00:${t}`
      } else {
        var s = t % 60
        if (s < 10) {
          s = `0${s}`
        }
        var m = Math.floor(t / 60)
        if (m < 60) {
          if (m < 10) {
            m = `0${m}`
          }
          return `00:${m}:${s}`
        } else {
          var h = Math.floor(m / 60)
          m = m % 60
          if (m < 10) {
            m = `0${m}`
          }
          if (h < 10) {
            h = `0${h}`
          }
          return `${h}:${m}:${s}`
        }
      }
    }
  },
  data() {
    return {
      user: null,
      measurementsMap: [],
      statusMap: ['已禁用', '奔放中'],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '+id'
      },
      listQueryVideo: {
        page: 1,
        limit: 20
      },
      temp: {
        status: 1,
        videos: {
          list: [],
          total: 0
        }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      pvTotal: 0,
      listQueryPv: {
        page: 1,
        limit: 20,
        title: undefined
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
      this.getMeasurements()
    },
    getActorVideoList(videos) {
      getActorVideoList(this.listQueryVideo).then(res => {
        videos.list = res.data.list
        videos.total = res.data.total
      })
    },
    handleAddRecord(row) {
      if (row) {
        for (const record of this.temp.videos.list) {
          if (record.id === row.id) {
            this.$message({
              message: '相同视频已存在',
              type: 'error'
            })
            return
          }
        }
        this.temp.videos.list.unshift(
          {
            id: row.id,
            title: row.title,
            picThumb: row.picThumb
          }
        )
        this.temp.videos.total++
        this.dialogPvVisible = false
      }
    },
    handleRemoveVideo(row) {
      removeActorVideo({ id: row.id }).then(() => {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        this.getList()
      })
    },
    getList() {
      this.listLoading = true
      getActorList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getMeasurements() {
      getMeasurements().then(res => {
        measurementsMap = res.data.list
        this.measurementsMap = measurementsMap
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
        status: 1,
        videos: {
          list: [],
          total: 0
        }
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
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          addActor(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getList()
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
      // this.temp = row // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
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
          // tempData.add_time = (new Date(tempData.add_time)).getTime()
          // const data = { id: tempData.id, status: tempData.status, birthday: tempData.birthday, nickname: tempData.nickname, signature: tempData.signature }
          updateActor(tempData).then(() => {
            // const index = this.list.findIndex(v => v.id === this.temp.id)
            // this.list.splice(index, 1, this.temp)
            this.getList()
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
      this.$confirm('确定需要删除演员【' + row.name + '】并且清除所有关联数据吗？操作不可恢复!', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteActor({ id: row.id }).then(() => {
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
    handleSearch() {
      this.dialogPvVisible = true
      const data = {
        title: this.listQueryPv.title,
        page: this.listQueryPv.page,
        limit: this.listQueryPv.limit
      }
      getUnActorVideos(data).then(res => {
        this.pvData = res.data.list
        this.pvTotal = res.data.total
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
