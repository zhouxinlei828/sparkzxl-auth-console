<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card style="overflow-y: auto; height: 650px">
          <div slot="header" class="clearfix">
            <span>字典列表</span>
            <el-tag
              v-show="activeData.activeDictionary !== ''"
              size="mini"
              type="danger"
              style="float: right"
              effect="plain"
            >
              {{ activeData.activeDictionary }}
            </el-tag>
          </div>
          <el-form :inline="true" size="small">
            <el-form-item>
              <el-input
                v-model="queryForm.type"
                prefix-icon="el-icon-search"
                style="width: 150px"
                placeholder="类型"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="queryForm.name"
                style="width: 150px"
                prefix-icon="el-icon-search"
                placeholder="名称"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                style="margin-left: 12px"
                icon="search"
                type="primary"
                @click="getDictionaryPage(1, 10)"
              >
                搜索
              </el-button>
              <el-button
                size="small"
                style="margin-left: 12px"
                type="primary"
                @click="handleAddDictionary"
              >
                添加
              </el-button>
            </el-form-item>
          </el-form>
          <div style="overflow-y: auto; height: 450px">
            <el-table
              ref="dictionaryTable"
              v-loading="tableLoading"
              :data="dictionaryData"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              border
              style="width: 100%"
              highlight-current-row
              @current-change="handleCurrentTableChange"
            >
              <el-table-column prop="type" label="类型"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="status" label="状态" width="70">
                <template #default="{ row }">
                  <el-tag
                    :type="row.status === true ? 'primary' : 'success'"
                    disable-transitions
                  >
                    {{ row.status === true ? '启用' : '停用' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
                  <el-link type="primary">
                    <IconFont
                      type="icon-edit"
                      @click="handleEditDictionary(row)"
                    />
                  </el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary">
                    <IconFont
                      type="icon-template_delete"
                      @click="handleDeleteDictionary(row.id)"
                    />
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              :current-page="queryForm.pageNum"
              :page-size="queryForm.pageSize"
              :layout="layout"
              :total="total"
              :page-sizes="[5, 10, 20, 30]"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="overflow-y: auto; height: 650px">
          <div slot="header" class="clearfix">
            <span>{{ activeData.dictionaryItemTitle }}</span>
          </div>
          <el-form :inline="true" size="small">
            <el-form-item>
              <el-input
                v-model="queryItemForm.code"
                style="width: 150px"
                prefix-icon="el-icon-search"
                placeholder="编码"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="queryItemForm.name"
                style="width: 150px"
                prefix-icon="el-icon-search"
                placeholder="名称"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                size="small"
                style="margin-left: 12px"
                type="primary"
                icon="search"
                @click="getDictionaryItemList"
              >
                搜索
              </el-button>
              <el-button
                size="small"
                style="margin-left: 12px"
                type="primary"
                @click="handleAddDictionaryItem"
              >
                添加
              </el-button>
            </el-form-item>
          </el-form>
          <div style="overflow-y: auto; height: 450px">
            <el-table
              v-loading="tableItemLoading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              :data="dictionaryItemData"
              border
              style="width: 100%"
            >
              <el-table-column prop="code" label="编码"></el-table-column>
              <el-table-column prop="name" label="名称"></el-table-column>
              <el-table-column prop="status" label="状态" width="70">
                <template #default="{ row }">
                  <el-tag
                    :type="row.status === true ? 'primary' : 'success'"
                    disable-transitions
                  >
                    {{ row.status === true ? '启用' : '停用' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
                  <el-link type="primary">
                    <IconFont
                      type="icon-edit"
                      @click="handleUpdateDictionaryItem(row)"
                    />
                  </el-link>
                  <el-divider direction="vertical"></el-divider>
                  <el-link type="primary">
                    <IconFont
                      type="icon-template_delete"
                      @click="handleDeleteDictionaryItem(row.id)"
                    />
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <dictionary-edit-form
      ref="dictionaryCreateForm"
      @fetch-data="getDictionaryPage"
    />
    <dictionary-item-edit-form
      ref="dictionaryItemCreateForm"
      @fetch-data="getDictionaryItemList"
    />
  </div>
</template>
<style></style>
<script>
  import {
    getDictionaryPage,
    getDictionaryItemList,
    deleteDictionary,
    deleteDictionaryItem,
  } from '@/api/dictionary'
  import DictionaryEditForm from '@/views/base/modules/DictionaryEditForm'
  import DictionaryItemEditForm from '@/views/base/modules/DictionaryItemEditForm'

  export default {
    components: {
      DictionaryEditForm,
      DictionaryItemEditForm,
    },
    data() {
      return {
        form: {
          id: null,
          parentId: 0,
          label: '',
          path: '',
          component: '',
          isEnable: '1',
          sortValue: 1,
          describe: '',
        },
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          type: '',
          name: '',
        },
        total: 0,
        layout: 'total, sizes, prev, pager, next, jumper',
        currentRow: null,
        queryItemForm: {
          code: '',
          name: '',
        },
        itemTotal: 0,
        itemLayout: 'total, sizes, prev, pager, next, jumper',
        activeData: {
          activeDictionary: '',
          dictionaryId: null,
          dictionaryType: '',
          dictionaryItemTitle: '字典详情',
        },
        dictionaryData: [],
        tableLoading: false,
        tableItemLoading: false,
        dictionaryItemData: [],
      }
    },
    mounted() {
      this.getDictionaryPage()
    },
    methods: {
      getDictionaryItemList() {
        this.tableItemLoading = true
        const params = {
          dictionaryId: this.activeData.dictionaryId,
          code: this.queryItemForm.code,
          name: this.queryItemForm.name,
        }
        getDictionaryItemList(params).then((response) => {
          this.dictionaryItemData = response.data
          this.tableItemLoading = false
        })
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.getDictionaryPage()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val
        this.getDictionaryPage()
      },
      getDictionaryPage() {
        const params = {
          pageNum: this.queryForm.pageNum,
          pageSize: this.queryForm.pageSize,
          sort: 'id',
          model: {
            type: this.queryForm.type,
            name: this.queryForm.name,
          },
        }
        getDictionaryPage(params).then((response) => {
          const responseData = response.data
          this.total = parseInt(responseData.total)
          this.dictionaryData = responseData.list
          if (this.dictionaryData.length > 0) {
            const dictionaryId = this.activeData.dictionaryId
            this.currentRow = this.dictionaryData[0]
            this.$refs.dictionaryTable.setCurrentRow(this.currentRow)
            this.activeData = {
              dictionaryId:
                dictionaryId === null
                  ? this.dictionaryData[0].id
                  : dictionaryId,
              dictionaryType: this.dictionaryData[0].type,
              dictionaryItemTitle: '字典详情（'
                .concat(this.dictionaryData[0].name)
                .concat('）'),
              activeDictionary: this.dictionaryData[0].name,
            }
          }
          this.getDictionaryItemList()
        })
      },
      handleAddDictionary() {
        const data = {
          type: null,
          name: null,
          describe: null,
        }
        this.$refs['dictionaryCreateForm'].showDialog(data)
      },
      handleDeleteDictionary(id) {
        deleteDictionary(id).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除字典成功')
            this.activeData = {}
            this.getDictionaryPage()
          } else {
            this.$message.error('删除字典失败')
          }
        })
      },
      handleEditDictionary(record) {
        const data = {
          id: record.id,
          type: record.type,
          name: record.name,
          describe: record.describe,
        }
        this.$refs['dictionaryCreateForm'].showDialog(data)
      },
      handleCurrentTableChange(val) {
        this.currentRow = val
        this.activeData = {
          dictionaryId: val.id,
          dictionaryType: val.type,
          dictionaryItemTitle: '字典详情（'.concat(val.name).concat('）'),
          activeDictionary: val.name,
        }
        this.queryItemForm = {
          code: '',
          name: '',
        }
        this.getDictionaryItemList()
      },
      handleAddDictionaryItem() {
        const data = this.activeData
        data.code = null
        data.name = null
        data.isEnable = '1'
        data.describe = null
        console.log(data)
        this.$refs['dictionaryItemCreateForm'].showDialog(data)
      },
      handleUpdateDictionaryItem(record) {
        const data = this.activeData
        data.id = record.id
        data.code = record.code
        data.name = record.name
        data.isEnable = record.status === true ? '1' : '2'
        data.describe = record.describe
        console.log(data)
        this.$refs['dictionaryItemCreateForm'].showDialog(data)
      },
      handleDeleteDictionaryItem(id) {
        deleteDictionaryItem(id).then((response) => {
          const responseData = response.data
          if (responseData) {
            this.$message.success('删除字典项成功')
            this.getDictionaryPage()
          } else {
            this.$message.error('删除字典项成功')
          }
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
    },
  }
</script>
