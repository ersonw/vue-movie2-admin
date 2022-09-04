<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" :gutter="20" style="flex-wrap: warp;text-align-all: center;">
        <el-col>
          <el-card>
            <el-form :model="user" :label-position="left" style=" margin-left:50px;">
              <el-form-item label="用户ID">
                <el-tag>{{ user.id }}</el-tag>
              </el-form-item>
              <el-form-item label="用户昵称">
                <el-tag>{{ user.nickname }}</el-tag>
              </el-form-item>
              <el-form-item label="会员状态">
                <el-tag>{{ user.member }}</el-tag>
              </el-form-item>
              <el-form-item label="会员等级">
                <el-tag>{{ user.level }}</el-tag>
              </el-form-item>
              <el-form-item label="会员到期">
                <el-tag>{{ user.expired | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-tag>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col>
          <el-card>
            <el-form :model="user" :label-position="left" style=" margin-left:50px;">
              <el-form-item label="手机号">
                <el-tag>{{ user.phone }}</el-tag>
              </el-form-item>
              <el-form-item label="注册IP">
                <el-tag>{{ user.registerIp }}</el-tag>
              </el-form-item>
              <el-form-item label="个人签名">
                <el-tag>{{ user.text }}</el-tag>
              </el-form-item>
              <el-form-item label="注册时间">
                <el-tag>{{ user.addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-tag>
              </el-form-item>
              <el-form-item label="更新时间">
                <el-tag>{{ user.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-tag>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col>
          <el-card>
            <el-form :model="user" :label-position="left" style=" margin-left:50px;">
              <el-form-item label="资料完整度">
                <el-tag>{{ user.profile }}%</el-tag>
              </el-form-item>
              <el-form-item label="发布视频数">
                <el-tag>{{ user.videos }}</el-tag>
              </el-form-item>
              <el-form-item label="总获赞">
                <el-tag>{{ user.likes }}</el-tag>
              </el-form-item>
              <el-form-item label="总播放">
                <el-tag>{{ user.plays }}</el-tag>
              </el-form-item>
              <el-form-item label="总评论与回复">
                <el-tag>{{ user.comments }}</el-tag>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="视频标题" style="width: 300px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="danger" icon="el-icon-delete-solid" style="margin-left: 1vw;" @click="handleDeleteAll">
        删除选中({{ ids.length }})
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
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="上传者" class-name="status-col" width="150px">-->
      <!--        <template slot-scope="{row}">-->
      <!--          &lt;!&ndash;          <span class="link-type" @click="handleUser(row)">{{ row.nickname }}</span>&ndash;&gt;-->
      <!--          <router-link :to="'/shortVideo/shortVideoUser/'+row.userId">-->
      <!--            <span class="link-type">{{ row.nickname }}</span>-->
      <!--          </router-link>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="上传IP" class-name="status-col" width="150px">
        <template slot-scope="{row}">
          <span>
            {{ row.ip }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="点赞" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.like }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="播放" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.play }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论数" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag type="info">
            {{ row.comments }}
          </el-tag>
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
      <el-table-column label="用户主页置顶" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.pin"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </el-table-column>
      <el-table-column label="转发开关" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.forward"
            :active-value="1"
            :inactive-value="0"
          />
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
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-drawer size="60%" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" style="width: 90%; margin-left:50px;">
        <el-form-item label="标题">
          <el-input v-model="temp.title" type="textarea" />
        </el-form-item>
        <el-form-item label="用户置顶">
          <el-switch
            v-model="temp.pin"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="开启转发">
          <el-switch
            v-model="temp.forward"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item" :value="index" />
          </el-select>
        </el-form-item>
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确认
        </el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getShortVideoUser, deleteVideo, updateVideo, getUser } from '@/api/shortVideo'
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
          return '未审核'
        case 1:
          return '审核通过'
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
      infoLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined
      },
      ids: [],
      temp: {},
      statusOptions: ['下架', '通过'],
      dialogFormVisible: false,
      id: 0,
      user: {}
    }
  },
  created() {
    const { id } = this.$route.params
    // console.log(id)
    this.id = parseInt(id)
    this.getList()
    this.getUser()
  },
  methods: {
    getUser() {
      this.infoLoading = true
      getUser(this.id).then(data => {
        this.user = data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.infoLoading = false
        }, 1.5 * 1000)
      })
    },
    getList() {
      this.listLoading = true
      getShortVideoUser(this.listQuery, this.id).then(response => {
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
    handleUser(row) {
      console.log(row)
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
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateVideo(tempData).then((data) => {
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
      deleteVideo({ 'ids': this.ids, 'id': this.id }).then(data => {
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
      deleteVideo({ 'ids': data, 'id': this.id }).then(data => {
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
