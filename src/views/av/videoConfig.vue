<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="最大视频随机播放基数">
        <el-input v-model="temp.maxPlays" type="number" />
      </el-form-item>
      <el-form-item label="最大视频随机点赞基数">
        <el-input v-model="temp.maxLikes" type="number" />
      </el-form-item>
      <el-form-item label="全局试看时长(秒)">
        <el-input v-model="temp.VideoTrial" type="number" />
      </el-form-item>
      <el-form-item label="会员购买视频优惠(%)">
        <el-input v-model="temp.VideoPayLess" type="number" />
      </el-form-item>
      <el-form-item label="仅会员可以观看免费视频">
        <el-switch
          v-model="temp.VideoPay"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="评论审核">
        <el-switch
          v-model="temp.commentAudit"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-button @click="getConfig">
        重置
      </el-button>
      <el-button type="primary" @click="updateData()">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
import { getVideoConfig, updateVideoConfig } from '@/api/av'

export default {
  data() {
    return {
      loading: true,
      temp: {}
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      this.loading = true
      getVideoConfig().then(data => {
        this.temp = data
        this.loading = false
      })
    },
    updateData() {
      this.loading = true
      updateVideoConfig(this.temp).then(data => {
        // for (const dataKey in data) {
        //   const index = this.temp.findIndex(v => v.id === this.temp.id)
        //   this.list.splice(index, 1, data[dataKey])
        // }
        this.$notify({
          title: 'Success',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
        this.getConfig()
      })
    }
  }
}
</script>

<style scoped>

</style>
