<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="视频标题" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        删除选中({{ ids.length }})
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handlePriceAll">
        批量付费({{ ids.length }})
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
      <el-table-column label="试看时长（秒）" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.trial }}
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
      <el-table-column label="播放率(超过试看时间)" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.scale }}%
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

    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="temp.title" type="textarea" />
        </el-form-item>
        <el-form-item label="点赞基数">
          <el-input v-model="temp.likes" type="number" />
        </el-form-item>
        <el-form-item label="播放基数">
          <el-input v-model="temp.plays" type="number" />
        </el-form-item>
        <el-form-item label="试看时长(秒)">
          <el-input v-model="temp.trial" type="number" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item" :value="index" />
          </el-select>
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

    <el-dialog :visible.sync="dialogPlayerVisible" :title="playData.title">
      <video id="videoPlayer" ref="videoPlayer" class="video-js" :poster="playData.picThumb" muted />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlePlayClose(playData)">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteAv, getList, update, addPrice } from '@/api/av'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import Videojs from 'video.js'

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
      price: 0,
      temp: {},
      statusOptions: ['禁用', '启用'],
      dialogFormVisible: false,
      dialogPlayerVisible: false,
      dialogPriceVisible: false,
      playData: {},
      myPlyer: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total

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
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
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
    handlePlay(row) {
      this.dialogPlayerVisible = true
      this.playData = row
      this.$nextTick(() => {
        this.getVideo(this.playData.vodPlayUrl)
      })
    },
    getVideo(url) {
      const options = {
        autoplay: false, // 设置自动播放
        controls: true, // 显示播放的控件
        width: 600,
        height: 600,
        sources: [
          {
            src: url,
            type: 'application/x-mpegURL' // 告诉videojs,这是一个hls流
          }
        ]
      }
      this.myPlyer = Videojs('videoPlayer', options, function onPlayerReady() {
        this.myPlyer.play()
      })
    },
    handlePlayClose(row) {
      this.dialogPlayerVisible = false
      if (this.myPlyer !== undefined) {
        this.myPlyer.dispose()
        this.myPlyer = undefined
      }
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          update(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
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
      deleteAv({ 'ids': this.ids }).then(data => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
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
      addPrice({ 'ids': this.ids, 'amount': this.price }).then(data => {
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
    handleDelete(row, index) {
      var data = []
      data.push(row.id)
      deleteAv({ 'ids': data }).then(data => {
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
