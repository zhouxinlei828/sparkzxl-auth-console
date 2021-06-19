<template>
  <el-container>
    <el-header height="60px">
      <div class="vab-main">
        <el-row>
          <el-col :span="3">
            <vab-logo />
          </el-col>
          <el-col :span="16">
            <div class="left-panel">
              <vab-breadcrumb class="hidden-xs-only" />
            </div>
          </el-col>
          <el-col :span="5">
            <div class="right-panel">
              <vab-icon
                title="重载路由"
                :pulse="pulse"
                :icon="['fas', 'redo']"
                @click="refreshRoute"
              />
              <pool-avatar />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-header>
    <el-main>
      <div class="filter-container" style="padding-bottom: 0">
        <el-row>
          <el-col align="left" :span="5" :offset="1">
            <span
              style="
                color: #181818;
                font-size: 28px;
                height: 48px;
                line-height: 48px;
              "
            >
              租户池管理
            </span>
            <el-divider direction="vertical" style="height: 2em"></el-divider>
            <span style="color: #181818; font-size: 18px; height: 48px">
              租户池
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col align="left" :span="24" :offset="1">
            <el-input
              v-model="queryParam.code"
              size="small"
              class="filter-item search-item"
              placeholder="租户池编码"
            />
            <el-input
              v-model="queryParam.name"
              size="small"
              class="filter-item search-item"
              placeholder="租户池名称"
            />
            <el-button
              size="small"
              class="filter-item button-item"
              icon="search"
              type="primary"
              @click="getTenantList()"
            >
              查询
            </el-button>
            <el-button
              size="small"
              class="filter-item button-item"
              @click="
                () =>
                  (queryParam = {
                    pageNum: 1,
                    pageSize: 10,
                    code: null,
                    name: null,
                  })
              "
            >
              重置
            </el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="22" :sm="6" :md="6" :lg="6" :xl="4">
            <el-card
              :body-style="{ padding: '0px', height: '220px' }"
              shadow="hover"
            >
              <el-link @click="handleAdd">
                <div style="line-height: 30px">
                  <img
                    class="tenant-add"
                    style="width: 30px; height: 30px; margin-top: 80px"
                    src="@/assets/plus.png"
                  />
                  <br />
                  <span style="font-size: 16px; line-height: 20px">
                    添加租户池
                  </span>
                </div>
              </el-link>
            </el-card>
          </el-col>
          <el-col
            v-for="(item, index) in tenantPoolData"
            :key="index"
            :xs="22"
            :sm="6"
            :md="6"
            :lg="6"
            :xl="4"
          >
            <el-card
              :body-style="{ padding: '0px', height: '220px' }"
              shadow="hover"
            >
              <div class="tenant-main">
                <img class="tenant-logo" :src="item.logo" />
                <span class="tenant-name">
                  {{ item.name }}
                </span>
              </div>
              <div class="tenant-sub">
                <span>{{ item.describe }}</span>
              </div>
              <div class="tenant-sub">
                总用户数：
                <span style="color: red">{{ item.userCount }}</span>
                人
              </div>
              <el-divider />
              <div class="tenant-button">
                <el-button
                  size="mini"
                  class="button-item"
                  type="primary"
                  @click="handleEdit(item)"
                >
                  修改
                </el-button>
                <el-button
                  v-show="item.readonly === false"
                  size="mini"
                  icon="el-icon-delete"
                  class="button-item"
                  type="danger"
                  @click="handleDelete(item)"
                >
                  删除
                </el-button>
                <el-button
                  size="mini"
                  class="button-item"
                  @click="comeInConsole(item)"
                >
                  控制台
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          background
          :current-page="queryParam.pageNum"
          :layout="layout"
          :page-size="queryParam.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </el-main>
    <el-footer class="footer-copyright">
      Copyright
      <vab-icon :icon="['fas', 'copyright']" />
      sparkzxl {{ fullYear }}
    </el-footer>
    <tenant-edit-form ref="editForm" @fetch-data="getTenantList" />
  </el-container>
</template>
<script>
  import variables from '@/styles/variables.scss'
  import PoolAvatar from '@/views/tenant/modules/PoolAvatar'
  import { deleteTenant, getTenantPageList } from '@/api/tenant'
  import TenantEditForm from './modules/TenantEditForm'
  import {
    getTenantInfo,
    getUserInfo,
    setTenantInfo,
  } from '@/utils/storageUtils'
  import store from '@/store'
  import { resetRouter } from '@/router'
  import Vue from 'vue'
  export default {
    components: {
      PoolAvatar,
      TenantEditForm,
    },
    data() {
      return {
        pulse: false,
        queryParam: {
          pageNum: 1,
          pageSize: 5,
          code: null,
          name: null,
        },
        list: null,
        tenantPoolData: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        elementLoadingText: '正在加载...',
        fullYear: new Date().getFullYear(),
      }
    },
    computed: {
      variables() {
        return variables
      },
    },
    created() {
      this.getTenantList()
    },
    methods: {
      handleAdd() {
        const createData = {
          id: null,
          name: null,
          logo: null,
          status: '1',
          describe: null,
        }
        this.$refs['editForm'].showDialog(createData)
      },
      handleEdit(record) {
        const data = {
          id: record.id,
          name: record.name,
          logo: record.logo,
          status: record.status === true ? '1' : '2',
          describe: record.describe,
        }
        this.$refs['editForm'].showDialog(data)
      },
      async comeInConsole(item) {
        await store.dispatch('user/clearUserInfo')
        await resetRouter()
        const tenantInfo = {
          tenantName: item.name,
          tenantStatus: true,
          tenant: item.code,
        }
        setTenantInfo(tenantInfo)
        await this.$router.push('/index')
      },
      async getTenantList() {
        const tenantInfo = getTenantInfo()
        if (
          tenantInfo !== null &&
          tenantInfo.tenantStatus !== undefined &&
          tenantInfo.tenantStatus === true
        ) {
          const userInfo = getUserInfo()
          const queryParam = {
            pageNum: this.queryParam.pageNum,
            pageSize: this.queryParam.pageSize,
            model: {
              code: this.queryParam.code,
              name: this.queryParam.name,
              tenantUserId: userInfo.id,
            },
          }
          getTenantPageList(queryParam).then((response) => {
            const result = response.data
            this.total = parseInt(result.total)
            this.tenantPoolData = result.list
          })
        } else {
          Vue.prototype.$baseNotify(
            '您的角色不是租户管理员，无法访问...',
            '错误',
            'error'
          )
        }
      },
      handleDelete(item) {
        deleteTenant({ ids: [item.id] }).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除租户池成功')
            this.getTenantList()
          } else {
            this.$message.error('删除租户池失败')
          }
        })
      },
      handleSizeChange(val) {
        this.queryParam.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryParam.pageNum = val
        this.fetchData()
      },
      async refreshRoute() {
        this.$baseEventBus.$emit('reload-router-view')
        this.pulse = true
        setTimeout(() => {
          this.pulse = false
        }, 1000)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .el-header {
    display: flex;
    align-items: center;
    justify-items: flex-end;
    background: $base-menu-background;
  }
  .el-main {
    background-color: #f6f8f9;
    color: #333;
    text-align: center;
    line-height: 50px;
    height: calc(100vh - 20vh);
    overflow-x: hidden;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .vab-main {
    width: 100%;
    background: $base-menu-background;

    ::v-deep {
      .el-menu {
        &.el-menu--horizontal {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: $base-top-bar-height;
          border-bottom: 0 solid transparent !important;

          .el-menu-item,
          .el-submenu__title {
            padding: 0 15px;
          }

          @media only screen and (max-width: 767px) {
            .el-menu-item,
            .el-submenu__title {
              padding: 0 8px;
            }

            li:nth-child(4),
            li:nth-child(5) {
              display: none !important;
            }
          }

          > .el-menu-item {
            height: $base-top-bar-height;
            line-height: $base-top-bar-height;
          }

          > .el-submenu {
            .el-submenu__title {
              height: $base-top-bar-height;
              line-height: $base-top-bar-height;
            }
          }
        }

        svg {
          width: 1rem;
          margin-right: 3px;
        }

        &--horizontal {
          .el-menu {
            .el-menu-item,
            .el-submenu__title {
              height: $base-menu-item-height;
              line-height: $base-menu-item-height;
            }
          }

          .el-submenu,
          .el-menu-item {
            &.is-active {
              background-color: $base-color-blue !important;
              border-bottom: 0 solid transparent !important;

              .el-submenu__title {
                border-bottom: 0 solid transparent !important;
              }
            }
          }

          > .el-menu-item {
            .el-tag {
              margin-top: calc(#{$base-top-bar-height} / 2 - 7.5px);
              margin-left: 5px;
            }

            @media only screen and (max-width: 1199px) {
              .el-tag {
                display: none;
              }
            }

            &.is-active {
              background-color: transparent !important;
              border-bottom: 3px solid $base-color-blue !important;
            }
          }
        }
      }
    }
  }
  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: $base-nav-bar-height;

    ::v-deep {
      svg {
        width: 1em;
        height: 1em;
        margin-right: 15px;
        font-size: $base-font-size-small;
        color: $base-color-gray;
        cursor: pointer;
        fill: $base-color-gray;
      }

      button {
        svg {
          margin-right: 0;
          color: $base-color-white;
          cursor: pointer;
          fill: $base-color-white;
        }
      }

      .el-badge {
        margin-right: 15px;
      }
    }
  }
  .tenant-add {
    width: 30px;
    height: 30px;
  }
  .tenant-logo {
    width: 68px;
    height: 68px;
    flex-shrink: 0;
    margin-right: 12px;
    transform: translateX(-8px);
    border-radius: 4px;
    overflow: hidden;
  }
  .tenant-main {
    text-align: center;
    line-height: 100px;
  }
  .tenant-name {
    color: #181818;
    font-family: 'Comic Sans MS';
    font-size: 24px;
    height: 68px;
  }
  .tenant-sub {
    text-align: center;
    line-height: 20px;
  }
  .tenant-button {
    text-align: center;
    line-height: 20px;
    transform: translateY(-8px);
  }
  .footer-copyright {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    border-top: 1px dashed $base-border-color;
  }
</style>
