<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="会员昵称" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        批量删除({{ ids.length }})
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
      <el-table-column label="视频" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleVideo(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邀请人" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <!--          <span class="link-type" @click="handleUser(row)">{{ row.nickname }}</span>-->
          <span class="link-type">{{ row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="被邀请人" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <!--          <span class="link-type" @click="handleUser(row)">{{ row.nickname }}</span>-->
          <span class="link-type">{{ row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效IP" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span>
            {{ row.ip }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-drawer :before-close.sync="drawerClose" size="36%" :visible.sync="dialogFormVisible">
      <el-row style="text-align-all: center;">
        <el-col :span="24">
          <video ref="video" width="90%" class="full-height full-width" controls />
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { getShareVideo, deleteShareVideo } from '@/api/shortVideo'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import Hls from 'hls.js' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      switch (status) {
        case 0:
          return '未处理'
        case 1:
          return '已处理'
        default:
          return '审核失败'
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
      statusOptions: ['拒绝', '通过'],
      dialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    drawerClose(hide) {
      this.$refs.video.pause()
      hide()
    },
    getStream(source) {
      if (Hls.isSupported()) {
        this.hls = new Hls()
        this.hls.loadSource(source)
        this.hls.attachMedia(this.$refs.video)
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('加载成功')
          this.$refs.video.play()
        })
        this.hls.on(Hls.Events.ERROR, (event, data) => {
          // console.log(event, data);
          // 监听出错事件
          console.log('加载失败')
        })
      }
    },
    getList() {
      this.listLoading = true
      getShareVideo(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleVideo(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.getStream(this.temp.playUrl)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
    },
    handleDeleteAll() {
      deleteShareVideo({ 'ids': this.ids }).then(data => {
        for (let i = 0; i < this.ids.length; i++) {
          const index = this.list.findIndex(v => v.id === this.ids[i])
          this.list.splice(index, 1)
        }
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteShareVideo({ 'ids': data }).then(data => {
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
