<template>
    <div :class="prefixCls">
        <div :class="prefixCls + '-left'">
             <Form :label-width="100" inline>
                <FormItem label="用户类型：">
                    <Select v-model="value.type" class="inputWidth">
                        <Option v-for="item of userType" :value="item.type" :key="item.type">{{item.typeName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户关键字：">
                    <Input v-model="value.keyword"  class="inputWidth" placeholder="请输入用户昵称/手机号"></Input>
                </FormItem>
            </Form>
        </div>
        <div :class="prefixCls + '-right'">
            <slot name="btn"></slot>
        </div>
    </div>
    
</template>

<script>
const prefixCls = "user-management-search";
export default {
    name: "user-management-search",
    props: {
        value: {
        type: Object,
        default: () => {},
        },
    },
    data() {
        return {
            prefixCls,
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
                },
            ]
        };
    },
};
</script>

<style lang="less" scoped>
@prefix: ~"user-management-search";
.@{prefix}{
    padding-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
<style>
    .inputWidth {
        width: 160px;
    }
</style>