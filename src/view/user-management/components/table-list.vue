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
            userType: [
                {
                    type: 0,
                    typeName: '全部'
                },
                {
                    type: 1,
                    typeName: '普通'
                },
                {
                    type: 2,
                    typeName: '会员'
                },
                {
                    type: 3,
                    typeName: '黑名单'
                }
            ],
            columns: [
                {
                    key: "id",
                    title: "id"
                },
                {
                    key: "avatar",
                    title: "用户头像",
                    render: (h, { row }) => {
                        return h('img', {
                            attrs: {
                                src: row.avatar,
                                width: 30,
                                height: 30
                            }
                        })
                    }
                },
                {
                    key: "nickname",
                    title: "用户昵称"
                },
                {
                    key: "type",
                    title: "用户类型",
                    render: (h, { row }) => {
                        return h('span', this.userType[row.type] && this.userType[row.type].typeName)
                    }
                },
                {
                    key: "contact",
                    title: "手机号",
                    render: (h, { row }) => {
                        return h('span', row.contact && row.contact.phone)
                    }
                },
                {
                    key: "pages",
                    title: "闪页数"
                },
                // {
                //     key: "updated_at",
                //     title: "最近登录时间",
                //     width: 160
                // },
                {
                    slot: "action",
                    title: "操作"
                },
            ]
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