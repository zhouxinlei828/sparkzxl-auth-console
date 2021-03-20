<template>
  <el-link @click="changeRealm">
    <div
      v-if="realmStatus === 'true'"
      style="display: flex; align-items: center"
    >
      <span class="realm">{{ realmName }}</span>
      <div class="realm-container" @click="changeRealm">
        <img style="height: 20px" src="@/assets/switch.png" />
        <span class="changeRealm">切换领域池</span>
      </div>
    </div>
  </el-link>
</template>

<script>
  import {
    getRealmName,
    getRealmStatus,
    removeRealm,
  } from '@/utils/storageUtils'
  import store from '@/store'
  import { resetRouter } from '@/router'
  export default {
    name: 'MainRealm',
    data() {
      return {
        realmName: getRealmName(),
        realmStatus: getRealmStatus(),
      }
    },
    created() {},
    mounted() {},
    methods: {
      async changeRealm() {
        removeRealm()
        await store.dispatch('user/clearUserInfo')
        await resetRouter()
        await this.$router.push('/console/pool')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .realm-container {
    background-color: rgba(57, 106, 255, 0.1);
    padding: 0px 4px;
    border-radius: 4px;
    transform: scale(0.8);
  }
  .realm {
    font-family: 'Comic Sans MS';
    font-size: 20px;
    transform: translateY(-10%);
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $base-color-default;
  }
  .changeRealm {
    font-size: 15px;
    margin-left: 5px;
    color: $base-color-default;
  }
</style>
