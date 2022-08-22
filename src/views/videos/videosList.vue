<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="用户ID或者标题" style="width: 20vw;margin-right: 1vw" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.class" placeholder="分类" clearable style="width: 10vw;margin-right: 1vw" class="filter-item">
        <el-option v-for="item in classMap" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="refresh">
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
      <el-table-column label="关联用户" min-width="150px">
        <template slot-scope="{row}">
          <el-tag><span class="link-type" @click="handleSearch(row.user.id)">{{ row.user.nickname || '无' }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="番号" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.numbers }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面" align="center" min-width="240px">
        <template slot-scope="{row}">
          <el-image :src="row.picThumb" />
        </template>
      </el-table-column>
      <el-table-column label="建立时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vodTimeAdd | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vodTimeUpdate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vodClass | classFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vodDuration | durationFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播放链接" min-width="550px">
        <template slot-scope="{row}">
          <span>{{ row.vodPlayUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下载链接" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.vodDownUrl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="唯一ID" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.shareId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频标签" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.vodTag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="演员" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag><span class="link-type" @click="handleSuperior(row.actor)">{{ row.actor | actorFilter }}</span></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="需要支付钻石" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.diamond }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播放量" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.play }}</span>
        </template>
      </el-table-column>
      <el-table-column label="推荐量" min-width="100px">
        <template slot-scope="{row}">
          <span>{{ row.recommends }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收藏量" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.collects }}</span>
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
        <el-form-item v-if="dialogStatus==='create'" label="金额">
          <el-input v-model="temp.amount" type="text" placeholder="输入金额" />
        </el-form-item>
        <el-form-item label="演员">
          <el-select v-model="temp.actor" class="filter-item" placeholder="展开选择演员">
            <el-option v-for="item in actorMap" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="temp.vodClass" class="filter-item" placeholder="展开选择分类">
            <el-option v-for="item in classMap" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="控制开关">
            <el-option v-for="(item,index) in statusMap" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="temp.title" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="原因" />
        </el-form-item>
        <el-form-item label="花费钻石">
          <el-input v-model="temp.diamond" type="number" placeholder="花费钻石" />
        </el-form-item>
        <el-form-item label="播放量">
          <el-input v-model="temp.play" type="number" placeholder="自定义播放量" />
        </el-form-item>
        <el-form-item label="推荐量">
          <el-input v-model="temp.recommends" type="number" placeholder="自定义推荐量" />
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

    <el-dialog :visible.sync="dialogPvVisible" title="关联女优作品列表">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="pvData"
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
        <el-table-column label="关联用户" min-width="150px">
          <template slot-scope="{row}">
            <el-tag><span class="link-type" @click="handleSearch(row.user.id)">{{ row.user.nickname || '无' }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="150px">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="番号" min-width="150px">
          <template slot-scope="{row}">
            <span>{{ row.numbers }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" align="center" min-width="240px">
          <template slot-scope="{row}">
            <el-image :src="row.picThumb" />
          </template>
        </el-table-column>
        <el-table-column label="分类" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.vodClass | classFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.vodDuration | durationFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="视频标签" min-width="50px">
          <template slot-scope="{row}">
            <span>{{ row.vodTag }}</span>
          </template>
        </el-table-column>
        <el-table-column label="需要支付钻石" min-width="100px">
          <template slot-scope="{row}">
            <span>{{ row.diamond }}</span>
          </template>
        </el-table-column>
        <el-table-column label="播放量" min-width="150px">
          <template slot-scope="{row}">
            <span>{{ row.play }}</span>
          </template>
        </el-table-column>
        <el-table-column label="推荐量" min-width="150px">
          <template slot-scope="{row}">
            <span>{{ row.recommends }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收藏量" min-width="150px">
          <template slot-scope="{row}">
            <span>{{ row.collects }}</span>
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

      <pagination v-show="pvTotal>0" :total="pvTotal" :page.sync="listQueryPv.page" :limit.sync="listQueryPv.limit" @pagination="handleSuperior" />

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
import { addBalance, checkUser } from '@/api/RechargeCentre'
import { deleteVideo, getActor, getActorVideos, getClass, getList, update } from '@/api/videos'
let classMap = []
let actorMap = []
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
    classFilter(type) {
      for (let i = 0; i < classMap.length; i++) {
        if (classMap[i].id === type) {
          return classMap[i].name
        }
      }
      return '无'
    },
    actorFilter(type) {
      for (let i = 0; i < actorMap.length; i++) {
        if (actorMap[i].id === type) {
          return actorMap[i].name
        }
      }
      return '无'
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
      classMap: [],
      actorMap: [],
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
      pvTotal: 0,
      listQueryPv: {
        page: 1,
        limit: 20,
        id: 0
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
    this.refresh()
  },
  methods: {
    refresh() {
      this.getClass()
      this.getActor()
      this.getList()
    },
    getClass() {
      getClass(new Date().getTime()).then(res => {
        classMap = [
          {
            id: 0,
            name: '无'
          }
        ]
        for (let i = 0; i < res.data.list.length; i++) {
          classMap.unshift(res.data.list[i])
        }
        this.classMap = classMap
      })
    },
    getActor() {
      getActor(new Date().getTime()).then(res => {
        actorMap = [
          {
            id: 0,
            name: '无'
          }
        ]
        for (let i = 0; i < res.data.list.length; i++) {
          actorMap.unshift(res.data.list[i])
        }
        this.actorMap = actorMap
      })
    },
    checkUser() {
      checkUser({ id: this.temp.uid }).then(res => {
        this.user = res.data.user
      })
    },
    handleSearch(t) {
      if (t) {
        this.dialogPvVisible = false
        this.listQuery.page = 1
        this.listQuery.class = undefined
        this.listQuery.title = t
        this.getList()
      }
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
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          addBalance(this.temp).then(() => {
            this.list.unshift(this.temp)
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
          tempData.add_time = (new Date(tempData.add_time)).getTime()
          // const data = { id: tempData.id, status: tempData.status, birthday: tempData.birthday, nickname: tempData.nickname, signature: tempData.signature }
          update(tempData).then(() => {
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
      this.$confirm('确定需要删除视频【' + row.title + '】并且清除所有与本视频关联的数据吗？操作不可恢复!', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVideo({ id: row.id }).then(() => {
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
      if (id) {
        this.listQueryPv.id = id
      }
      const data = {
        id: this.listQueryPv.id,
        page: this.listQueryPv.page,
        limit: this.listQueryPv.limit
      }
      getActorVideos(data).then(res => {
        this.pvData = res.data.list
        this.pvTotal = res.data.total
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
