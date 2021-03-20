<template>
  <div style="display: flex; align-items: center">
    <span class="realm">{{ realmName }}</span>
    <div
      style="
        background-color: rgba(57, 106, 255, 0.1);
        padding: 0px 4px;
        border-radius: 4px;
        transform: scale(0.8);
        cursor: pointer;
      "
      @click="changeRealm"
    >
      <img style="height: 20px" src="@/assets/switch.png" />
      <span class="changeRealm">切换领域池</span>
    </div>
  </div>
</template>

<script>
  import { getRealmName, removeRealm } from '@/utils/storageUtils'
  import store from '@/store'
  import { resetRouter } from '@/router'
  export default {
    name: 'MainRealm',
    data() {
      return {
        realmName: getRealmName(),
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
  .realm {
    font-weight: bold;
    font-family: Consolas;
    font-size: 20px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $base-color-default;
  }
  .changeRealm {
    font-size: 14px;
    margin-left: 5px;
    color: $base-color-default;
  }
</style>
