<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="开车进群链接">
        <el-input v-model="temp.carUrl" type="text" />
      </el-form-item>
      <el-form-item label="客服链接">
        <el-input v-model="temp.serviceUrl" type="text" />
      </el-form-item>
      <el-form-item label="开启购买钻石">
        <el-switch
          v-model="temp.buyDiamond"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启购买金币">
        <el-switch
          v-model="temp.buyCoin"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启我的下载">
        <el-switch
          v-model="temp.download"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启开车进群">
        <el-switch
          v-model="temp.openCar"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启我的视频">
        <el-switch
          v-model="temp.myVideo"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启在线客服">
        <el-switch
          v-model="temp.service"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启我的钱包">
        <el-switch
          v-model="temp.money"
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
import { getConfig, updateConfig } from '@/api/users'

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
      getConfig().then(data => {
        this.temp = data
        this.loading = false
      })
    },
    updateData() {
      this.loading = true
      updateConfig(this.temp).then(data => {
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
