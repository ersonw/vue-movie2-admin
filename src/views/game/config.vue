<template>
  <div class="app-container">
    <div class="filter-container" />
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="apiUrl">
        <el-input v-model="config.apiUrl" type="text" placeholder="apiUrl" />
      </el-form-item>
      <el-form-item label="agentId">
        <el-input v-model="config.agentId" type="text" placeholder="agentId" />
      </el-form-item>
      <el-form-item label="apiUser">
        <el-input v-model="config.apiUser" type="text" placeholder="apiUser" />
      </el-form-item>
      <el-form-item label="encryptKey">
        <el-input v-model="config.encryptKey" type="text" placeholder="encryptKey" />
      </el-form-item>
      <el-form-item label="signKey">
        <el-input v-model="config.signKey" type="text" placeholder="signKey" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="el-row">
      <el-button type="primary" @click="">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { configList } from '@/api/Game'

export default {
  data() {
    return {
      config: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      configList().then((res) => {
        this.config = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
