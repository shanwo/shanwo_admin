<template>
    <div :class="prefixCls">
       <Table :columns="columns" :data="userList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a @click="toEdit(row.id)">编辑</a>
            </template>
       </Table>
       <edit v-model="isShowEdit" :id="editId" @refresh="refresh"></edit>
    </div>
    
</template>

<script>
const prefixCls = "user-management-table-list";
import { userType, columns } from './../page-info';
export default {
    name: "user-management-table-list",
    props: {
        userList: {
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
};
</script>

<style lang="less" scoped>

@prefix: ~"user-management-table-list";
.@{prefix}{
    
}
</style>