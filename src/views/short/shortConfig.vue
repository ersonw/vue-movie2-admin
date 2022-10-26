<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="存储域名">
        <el-input v-model="temp.endPoint" type="text" />
      </el-form-item>
      <el-form-item label="图片域名">
        <el-input v-model="temp.picDomian" type="text" />
      </el-form-item>
      <el-form-item label="存储bucket">
        <el-input v-model="temp.bucket" type="text" />
      </el-form-item>
      <el-form-item label="accessKey">
        <el-input v-model="temp.accessKey" type="text" />
      </el-form-item>
      <el-form-item label="secretKey">
        <el-input v-model="temp.secretKey" type="text" />
      </el-form-item>
      <el-form-item label="存储端口">
        <el-input v-model="temp.port" type="text" />
      </el-form-item>
      <el-form-item label="useSSL">
        <el-switch
          v-model="temp.useSSL"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="强制覆盖存储配置">
        <el-switch
          v-model="temp.force"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="上传审核">
        <el-switch
          v-model="temp.auditUpload"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="允许转发">
        <el-switch
          v-model="temp.forward"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="评论审核">
        <el-switch
          v-model="temp.auditComment"
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
import { getVideoConfig, updateVideoConfig } from '@/api/shortVideo'

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
