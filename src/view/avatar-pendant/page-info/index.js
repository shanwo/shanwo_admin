export const columns = [
    {
        key: "id",
        title: "id"
    },
    {
        key: "image",
        title: "徽章",
        render: (h, { row }) => {
            return h('img', {
                attrs: {
                    src: row.image,
                    width: 30,
                    height: 30
                }
            })
        }
    },
    {
        key: "order",
        title: "排序"
    },
    {
        slot: "action",
        title: "操作"
    },
]