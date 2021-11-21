<template>
    <div :class="prefixCls">
       <Table :columns="columns" :data="pageList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a @click="toEdit(row.id)">推荐</a>
            </template>
       </Table>
       <edit v-model="isShowEdit" :id="editId" @refresh="refresh"></edit>
    </div>
    
</template>

<script>
const prefixCls = "shan-page-mannager-table-list";
import { openType, userType, columns } from './../page-info'
export default {
    name: "shan-page-mannager-table-list",
    props: {
        pageList: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        edit: () => import('./edit.vue')
    },
    data() {
        return {
            prefixCls,
            editId: null,
            isShowEdit: false,
            openType,
            userType,
            columns
        };
    },
    methods: {
        /**
         * @description 刷新列表页数据
         * @returns { undefined }
        */
        refresh () {
          this.$emit('refresh');  
        },
        /**
         * @description 编辑当前数据
         * @param { Number } id 当前数据id
         * @returns { undefined }
        */
        toEdit (id) {
            this.editId = id;
            this.isShowEdit = true;
        }
    }
}
</script>