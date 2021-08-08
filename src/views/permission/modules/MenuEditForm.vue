<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="closeDialog"
  >
    <el-form
      ref="ruleForm"
      :model="form"
      :inline="true"
      :rules="rules"
      size="small"
      label-width="100px"
    >
      <el-form-item label="上级菜单:" prop="parentId" required>
        <TreeSelect
          v-model="form.parentId"
          class="edit-form-item"
          :load-options="loadListOptions"
          :multiple="false"
          :searchable="true"
          placeholder="上级菜单"
          :options="menuTree"
        />
      </el-form-item>
      <el-form-item label="菜单标题:" prop="label" required>
        <el-input v-model="form.label" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="菜单图标:" prop="icon" style="width: 300px">
        <el-popover
          v-model="iconVisible"
          placement="bottom-start"
          width="330"
          trigger="manual"
        >
          <el-table :data="iconData" border height="273" :show-header="false">
            <el-table-column
              property="key1"
              width="60"
              label="1"
              align="center"
            >
              <template #default="{ row }">
                <el-link>
                  <IconFont
                    :type="row.key1"
                    @click="handleIconSelect(row.key1)"
                  />
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              property="key2"
              width="60"
              label="2"
              align="center"
            >
              <template #default="{ row }">
                <el-link>
                  <IconFont
                    :type="row.key2"
                    @click="handleIconSelect(row.key2)"
                  />
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              property="key3"
              width="61"
              label="3"
              align="center"
            >
              <template #default="{ row }">
                <el-link>
                  <IconFont
                    :type="row.key3"
                    @click="handleIconSelect(row.key3)"
                  />
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              property="key4"
              width="61"
              label="4"
              align="center"
            >
              <template #default="{ row }">
                <el-link>
                  <IconFont
                    :type="row.key4"
                    @click="handleIconSelect(row.key4)"
                  />
                </el-link>
              </template>
            </el-table-column>
            <el-table-column
              property="key5"
              width="61"
              label="5"
              align="center"
            >
              <template #default="{ row }">
                <el-link>
                  <IconFont
                    :type="row.key5"
                    @click="handleIconSelect(row.key5)"
                  />
                </el-link>
              </template>
            </el-table-column>
          </el-table>
          <el-button slot="reference" @click="selectIcon">
            <IconFont
              v-if="form.icon !== null && form.icon !== ''"
              :type="form.icon"
            />
            菜单图标
          </el-button>
          <el-button
            v-if="form.icon !== null && form.icon !== ''"
            slot="reference"
            @click="clearIcon"
          >
            清除
          </el-button>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单隐藏:" prop="hidden">
        <el-radio-group v-model="form.hidden" class="edit-form-item">
          <el-radio-button label="0">是</el-radio-button>
          <el-radio-button label="1">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单缓存:" prop="noKeepAlive">
        <el-radio-group v-model="form.noKeepAlive" class="edit-form-item">
          <el-radio-button label="0">是</el-radio-button>
          <el-radio-button label="1">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路由路径:" prop="path">
        <el-input v-model="form.path" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="组件名称:" prop="componentName">
        <el-input v-model="form.componentName" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="菜单重定向:" prop="redirect">
        <el-input v-model="form.redirect" class="edit-form-item" />
      </el-form-item>
      <el-form-item label="组件路径:" prop="component">
        <el-tooltip
          class="item"
          effect="dark"
          content="组件路径"
          placement="bottom"
        >
          <el-input v-model="form.component" class="edit-form-item" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="状态:" prop="isEnable" required>
        <div class="edit-form-item">
          <el-radio v-model="form.isEnable" label="1">启用</el-radio>
          <el-radio v-model="form.isEnable" label="2">禁用</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="菜单排序:" prop="sortValue">
        <el-input-number
          v-model="form.sortValue"
          class="edit-form-item"
          controls-position="right"
          :min="1"
          :max="100"
        />
      </el-form-item>
      <el-form-item label="描述:" prop="describe">
        <el-input
          v-model="form.describe"
          type="textarea"
          style="width: 510px"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" class="button-item" @click="closeDialog">
        取 消
      </el-button>
      <el-button
        size="small"
        class="button-item"
        type="primary"
        @click="onSubmit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { saveMenu, updateMenu } from '@/api/menu'
  export default {
    data() {
      return {
        title: '',
        dialogFormVisible: false,
        parentMenu: {
          id: '0',
          label: '顶级菜单',
          icon: 'icon-home1',
          parentId: null,
          sortValue: 1,
          children: null,
        },
        menuTree: [],
        iconVisible: false,
        iconArrayData: [
          'icon-pengyouquan',
          'icon-QQ',
          'icon-doc',
          'icon-PPT',
          'icon-excel',
          'icon-user',
          'icon-jichupeizhi',
          'icon-identity',
          'icon-home',
          'icon-shenjiguanli',
          'icon-jiankong',
          'icon-home1',
          'icon-lingyufenxi',
          'icon-icon-test',
          'icon-icon-test1',
          'icon-icon-test2',
          'icon-icon-test3',
          'icon-icon-test4',
          'icon-icon-test5',
          'icon-icon-test6',
          'icon-icon-test7',
          'icon-dingtalk',
          'icon-zuixing-80',
          'icon-saoyisao',
          'icon-link',
          'icon-yanzhengma1',
          'icon-manage-file',
          'icon-kaifazhe',
          'icon-process1',
          'icon-permission',
          'icon-daochu',
          'icon-liucheng',
          'icon-yanzhengma',
          'icon-2',
          'icon-tupian',
          'icon-16_10',
          'icon-guize',
          'icon-edit',
          'icon-fenpei',
        ],
        iconData: [],
        form: {
          id: null,
          parentId: 0,
          noKeepAlive: 1,
          redirect: null,
          icon: null,
          hidden: 1,
          label: null,
          path: null,
          component: null,
          componentName: null,
          isEnable: '1',
          sortValue: 1,
          describe: null,
        },
        rules: {
          label: [
            { required: true, message: '菜单名称不能为空', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
        status: 1,
      }
    },
    methods: {
      showDialog(data) {
        if (data.id !== null && data.id !== 0) {
          this.title = '修改菜单'
        } else {
          this.title = '新增菜单'
        }
        this.dialogFormVisible = true
        this.menuTree.push(this.parentMenu)
        const tree = data.menuTree
        tree.forEach((item) => {
          this.menuTree.push(item)
        })
        delete data.menuTree
        this.form = data
        this.initIconSelect()
      },
      initIconSelect() {
        const arrayData = this.iconArrayData
        const iconData = []
        for (let i = 0; i < arrayData.length; i = i + 5) {
          let icon = {}
          if (i + 5 > arrayData.length - 1) {
            const length = arrayData.length - i
            for (let j = 0; j < length; j++) {
              icon['key'.concat(j + 1)] = arrayData[i + j]
            }
          } else {
            for (let j = 0; j < 5; j++) {
              icon['key'.concat(j + 1)] = arrayData[i + j]
            }
          }
          iconData.push(icon)
        }
        this.iconData = iconData
      },
      handleIconSelect(key) {
        this.iconVisible = !this.iconVisible
        this.form.icon = key
      },
      selectIcon() {
        this.iconVisible = !this.iconVisible
      },
      clearIcon() {
        this.form.icon = null
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            const submitData = this.form
            submitData.isEnable = this.form.isEnable === '1'
            submitData.noKeepAlive = this.form.noKeepAlive === 0
            submitData.hidden = this.form.hidden === 0
            if (submitData.id != null) {
              updateMenu(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('修改菜单成功')
                  this.resetForm()
                } else {
                  this.$message.error('修改菜单失败')
                }
              })
            } else {
              saveMenu(submitData).then((response) => {
                const responseData = response.data
                if (responseData) {
                  this.$message.success('新增菜单成功')
                  this.resetForm()
                } else {
                  this.$message.error('新增菜单失败')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      loadListOptions({ callback }) {
        callback()
      },
      resetForm() {
        this.title = ''
        this.menuTree = []
        this.$refs['ruleForm'].resetFields()
        this.iconVisible = false
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      closeDialog() {
        this.title = ''
        this.menuTree = []
        this.$refs['ruleForm'].resetFields()
        this.iconVisible = false
        this.dialogFormVisible = false
      },
    },
  }
</script>
