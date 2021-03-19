<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar"></el-avatar>
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="refreshAuthority" divided>
        刷新权限
      </el-dropdown-item>
      <el-dropdown-item command="personalCenter" divided>
        个人中心
      </el-dropdown-item>
      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { refreshAuthority } from '@/api/role'

  export default {
    name: 'VabAvatar',
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout()
            break
          case 'personalCenter':
            this.personalCenter()
            break
          case 'refreshAuthority':
            this.refreshAuthority()
            break
        }
      },
      personalCenter() {
        this.$router.push('/personalCenter/personalCenter')
      },
      refreshAuthority() {
        refreshAuthority().then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('刷新权限成功')
            this.resetForm()
          } else {
            this.$message.error('刷新权限失败')
          }
        })
      },
      logout() {
        this.$baseConfirm(
          '您确定要退出' + this.$baseTitle + '吗?',
          null,
          async () => {
            await this.$store.dispatch('user/logout')
          }
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: 50px;
    padding: 0;

    .user-avatar {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      margin-left: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
</style>
