<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="分享域名">
        <el-input v-model="temp.shareUrl" type="text" placeholder="推广域名或者落地页" />
      </el-form-item>
      <el-form-item label="一级任务">
        <el-input v-model="temp.v1" type="number" placeholder="任务人数" />
        <el-input v-model="temp.v1v" type="text" placeholder="奖励公式 m会员 g游戏币 d钻石 m=1;g=1;d=1; 赠送会员1天+游戏币1个+钻石1个" />
        <el-input v-model="temp.v1s" type="text" placeholder="任务说明，留空按照公式生成" />
      </el-form-item>
      <el-form-item label="二级任务">
        <el-input v-model="temp.v2" type="number" placeholder="任务人数" />
        <el-input v-model="temp.v2v" type="text" placeholder="奖励公式 m会员 g游戏币 d钻石 m=1;g=1;d=1; 赠送会员1天+游戏币1个+钻石1个" />
        <el-input v-model="temp.v2s" type="text" placeholder="任务说明，留空按照公式生成" />
      </el-form-item>
      <el-form-item label="三级任务">
        <el-input v-model="temp.v3" type="number" placeholder="任务人数" />
        <el-input v-model="temp.v3v" type="text" placeholder="奖励公式 m会员 g游戏币 d钻石 m=1;g=1;d=1; 赠送会员1天+游戏币1个+钻石1个" />
        <el-input v-model="temp.v3s" type="text" placeholder="任务说明，留空按照公式生成" />
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
import { getShareConfig, updateShareConfig } from '@/api/users'

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
      getShareConfig().then(data => {
        this.temp = data
        this.loading = false
      })
    },
    updateData() {
      this.loading = true
      updateShareConfig(this.temp).then(data => {
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
