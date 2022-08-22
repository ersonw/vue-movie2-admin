<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        提交
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-refresh" @click="getList">
        刷新
      </el-button>
    </div>
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="开关" style="width: 36vw">
        <el-switch :value="true" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
