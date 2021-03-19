<template>
  <el-dialog
    title="分配角色用户"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="closeDialog"
  >
    <el-transfer
      v-model="form.userIds"
      :titles="['全部用户', '已选用户']"
      :button-texts="['移除', '添加']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :right-default-checked="userIds"
      :filterable="true"
      :props="{ key: 'value', label: 'desc' }"
      :data="data"
      @change="handleChange"
    ></el-transfer>
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
  import { roleUserList, saveAuthRoleUser } from '@/api/role'

  export default {
    data() {
      return {
        dialogFormVisible: false,
        data: [],
        userIds: [],
        form: {
          roleId: null,
          userIds: [],
        },
        rules: {
          code: [{ required: true, message: '编码不能为空', trigger: 'blur' }],
          name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' },
          ],
        },
        status: 1,
        orgData: [],
      }
    },
    created() {
      this.$watch('model', () => {
        this.form.roleId = this.model.id
        this.roleUserList(this.form.roleId)
        this.data = this.model.userList
      })
    },
    methods: {
      showDialog(data) {
        this.form.roleId = data.id
        this.roleUserList(this.form.roleId)
        this.data = data.userList
        this.dialogFormVisible = true
      },
      onSubmit() {
        const submitData = this.form
        saveAuthRoleUser(submitData).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('分配用户成功')
            this.resetForm()
          } else {
            this.$message.error('分配用户失败')
          }
        })
      },
      resetForm() {
        this.form.roleId = null
        this.form.userIds = []
        this.userIds = []
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      closeDialog() {
        this.form.roleId = null
        this.form.userIds = []
        this.userIds = []
        this.dialogFormVisible = false
      },
      roleUserList(roleId) {
        const parameter = {
          roleId: roleId,
        }
        roleUserList(parameter).then((response) => {
          const responseData = response.data
          const authUsers = responseData.authUsers
          if (authUsers != null) {
            for (const authUser of authUsers) {
              this.form.userIds.push(authUser.id)
            }
            this.userIds = this.form.userIds
          }
        })
      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys)
        console.log(this.form.userIds)
      },
    },
  }
</script>
