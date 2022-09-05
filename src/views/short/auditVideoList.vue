<template>
  <div class="app-container">
    <section v-loading="loading">
      <div class="filter-container">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 1vw;" round @click="handleFilter">
          随机视频
        </el-button>
        <el-button v-waves class="filter-item" type="warning" icon="el-icon-upload2" style="margin-left: 1vw;" round @click="handlePrevious">
          上一条视频
        </el-button>
        <el-button v-waves class="filter-item" type="success" icon="el-icon-download" style="margin-left: 1vw;" round @click="handleNext">
          下一条视频
        </el-button>
      </div>
      <el-row>
        <el-col :span="12">
          <video ref="video" height="800vh" width="90%" class="full-height full-width" controls />
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-form>
              <el-form-item label="ID">
                <el-tag>{{ list[videoIndex].id }}</el-tag>
              </el-form-item>
              <el-form-item label="发布文案">
                <el-tag>{{ list[videoIndex].title }}</el-tag>
              </el-form-item>
              <el-form-item label="UserID">
                <el-tag>{{ list[videoIndex].userId }}</el-tag>
              </el-form-item>
              <el-form-item label="用户昵称">
                <el-tag>{{ list[videoIndex].nickname }}</el-tag>
              </el-form-item>
              <el-form-item label="上传时间">
                <el-tag>{{ list[videoIndex].addTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-tag>
              </el-form-item>
              <el-form-item label="更新时间">
                <el-tag>{{ list[videoIndex].updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</el-tag>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin: 18px">
        <el-button v-waves class="filter-item" type="danger" icon="el-icon-upload2" style="margin-left: 1vw;" round @click="handleDeny">
          拒绝审核
        </el-button>
        <el-button v-waves class="filter-item" type="success" icon="el-icon-download" style="margin-left: 1vw;" round @click="handlePass">
          通过审核
        </el-button>
      </el-row>
    </section>
  </div>
</template>

<script>
import { getAuditVideoList, getAuditVideo, denyAuditVideo, passAuditVideo } from '@/api/shortVideo'
const Hls = require('hls.js')
export default {
  data() {
    return {
      list: [],
      video: {
        pic: '',
        playUrl: ''
      },
      videoIndex: 0,
      loading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  // eslint-disable-next-line vue/no-unused-components
  // components: { vueVideoPlayer },
  watch: {
    videoIndex: {
      immediate: true,
      handler(val, old) {
        if (val !== old) {
          if (val < this.list.length) this.getStream(this.list[val].playUrl)
        }
      },
      deep: true
    },
    list: {
      handler(val, old) {
        if (val.length > 0) {
          this.getStream(this.list[this.videoIndex].playUrl)
        }
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    getList() {
      this.loading = true
      getAuditVideoList(this.listQuery).then(data => {
        const { list, total } = data
        // for (let i = 0; i < list; i++) {
        //   this.list.push(list[i])
        // }
        // console.log(list)
        this.list = list
        this.total = total
        this.loading = false
        this.videoIndex = 0
        this.getStream(list[0].playUrl)
      })
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
    handleFilter() {
      this.loading = true
      getAuditVideo().then(data => {
        this.loading = false
        this.list.push(data)
        this.videoIndex = this.list.findIndex(v => v.id === data.id)
      })
    },
    handlePrevious() {
      if (this.videoIndex > 0) this.videoIndex--
    },
    handleNext() {
      if (this.videoIndex < this.list) {
        this.videoIndex++
      } else {
        this.getList()
      }
    },
    handleDeny() {
      this.loading = true
      denyAuditVideo({ 'id': this.list[this.videoIndex].id }).then(() => {
        this.loading = false
        this.list.slice(this.videoIndex, 1)
        this.$notify({
          title: 'Success',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handlePass() {
      this.loading = true
      passAuditVideo({ 'id': this.list[this.videoIndex].id }).then(() => {
        this.list.slice(this.videoIndex, 1)
        this.loading = false
      })
      this.$notify({
        title: 'Success',
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
    },
    init() {
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
