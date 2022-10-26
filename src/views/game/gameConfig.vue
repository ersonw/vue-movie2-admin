<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="游戏大厅客服">
        <el-input v-model="temp.service" />
      </el-form-item>
      <el-form-item label="存放游戏封面的域名">
        <el-input v-model="temp.ImageDomain" />
      </el-form-item>
      <el-form-item label="游戏代理ID">
        <el-input v-model="temp.agentId" />
      </el-form-item>
      <el-form-item label="游戏API网址">
        <el-input v-model="temp.apiUrl" />
      </el-form-item>
      <el-form-item label="API用户名">
        <el-input v-model="temp.apiUser" />
      </el-form-item>
      <el-form-item label="加密密钥">
        <el-input v-model="temp.encryptKey" />
      </el-form-item>
      <el-form-item label="通信密钥">
        <el-input v-model="temp.signKey" />
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
import { getGameConfig, updateGameConfig } from '@/api/game'

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
      getGameConfig().then(data => {
        this.temp = data
        this.loading = false
      })
    },
    updateData() {
      this.loading = true
      updateGameConfig(this.temp).then(data => {
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
