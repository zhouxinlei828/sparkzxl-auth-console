<template>
  <el-link @click="changeTenant">
    <div
      v-if="tenantStatus === true"
      style="display: flex; align-items: center"
    >
      <span class="tenant">{{ tenantName }}</span>
      <div class="tenant-container" @click="changeTenant">
        <img style="height: 20px" src="@/assets/switch.png" />
        <span class="changeTenant">切换租户池</span>
      </div>
    </div>
  </el-link>
</template>

<script>
  import { getTenantInfo, setTenantInfo } from '@/utils/storageUtils'
  export default {
    name: 'MainTenant',
    data() {
      return {
        tenantName: null,
        tenantStatus: false,
      }
    },
    created() {
      const tenantInfo = getTenantInfo()
      if (tenantInfo !== null) {
        this.tenantName = tenantInfo.tenantName
        this.tenantStatus = tenantInfo.tenantStatus
      }
    },
    mounted() {},
    methods: {
      async changeTenant() {
        const tenantInfo = getTenantInfo()
        delete tenantInfo.tenantName
        delete tenantInfo.tenant
        setTenantInfo(tenantInfo)
        await this.$router.push('/tenant/pool')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .tenant-container {
    background-color: rgba(57, 106, 255, 0.1);
    padding: 0px 4px;
    border-radius: 4px;
    transform: scale(0.8);
  }
  .tenant {
    font-family: 'Comic Sans MS';
    font-size: 20px;
    transform: translateY(-10%);
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $base-color-default;
  }
  .changeTenant {
    font-size: 15px;
    margin-left: 5px;
    color: $base-color-default;
  }
</style>
