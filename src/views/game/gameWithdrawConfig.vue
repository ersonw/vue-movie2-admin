<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="流水倍数">
        <el-input v-model="temp.water" type="number" />
      </el-form-item>
      <el-form-item label="单笔最小提现￥">
        <el-input v-model="temp.mini" type="number" />
      </el-form-item>
      <el-form-item label="单笔最大提现￥">
        <el-input v-model="temp.max" type="number" />
      </el-form-item>
      <el-form-item label="单笔手续费￥">
        <el-input v-model="temp.fee" type="number" />
      </el-form-item>
      <el-form-item label="提现汇率%">
        <el-input v-model="temp.rate" type="text" placeholder="汇率请设置为小于1的百分比 例如1%=0.01" />
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
import { getGameWithdrawConfig, updateGameWithdrawConfig } from '@/api/game'

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
      getGameWithdrawConfig().then(data => {
        this.temp = data
        this.loading = false
      })
    },
    updateData() {
      this.loading = true
      updateGameWithdrawConfig(this.temp).then(data => {
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
