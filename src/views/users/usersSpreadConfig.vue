<template>
  <div class="app-container">
    <el-form ref="dataForm" v-loading="loading" :model="temp" label-position="left" style="width: 80%; margin-left:50px;">
      <el-form-item label="开启代理返利">
        <el-switch
          v-model="temp.spread"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="开启代理返利自动暗扣">
        <el-switch
          v-model="temp.hidden"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="单用户最低开始暗扣">
        <el-input v-model="temp.hiddenMini" type="number" />
      </el-form-item>
      <el-form-item label="一级返利%">
        <el-input v-model="temp.spreadV1" type="number" />
      </el-form-item>
      <el-form-item label="一级当日暗扣比例%">
        <el-input v-model="temp.hiddenV1" type="number" />
      </el-form-item>
      <el-form-item label="二级返利%">
        <el-input v-model="temp.spreadV2" type="number" />
      </el-form-item>
      <el-form-item label="二级当日暗扣比例%">
        <el-input v-model="temp.hiddenV2" type="number" />
      </el-form-item>
      <el-form-item label="三级返利%">
        <el-input v-model="temp.spreadV3" type="number" />
      </el-form-item>
      <el-form-item label="三级当日暗扣比例%">
        <el-input v-model="temp.hiddenV3" type="number" />
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
import { getSpreadConfig, updateSpreadConfig } from '@/api/users'

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
      getSpreadConfig().then(data => {
        this.temp = data
        this.loading = false
      })
    },
    updateData() {
      this.loading = true
      updateSpreadConfig(this.temp).then(data => {
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
