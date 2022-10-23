import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/',
    name: 'index',
    meta: {
      hideInMenu: true,
      notCache: true,
      title: '官网',
      icon: 'md-home'
    },
    component: () => import('@/view/main')
  },
  {
    path: '/home',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'users_list',
        meta: {
          icon: 'md-people',
          title: '用户管理'
        },
        component: () => import('@/view/users/list.vue')
      }
    ]
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'feedback_list',
        meta: {
          icon: 'md-chatboxes',
          title: '用户反馈'
        },
        component: () => import('@/view/feedback/list.vue')
      }
    ]
  },
  {
    path: '/classification',
    name: 'classification',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'classification_list',
        meta: {
          icon: 'md-clipboard',
          title: '分类管理'
        },
        component: () => import('@/view/classification/list.vue')
      }
    ]
  },
  {
    path: '/decoration',
    name: 'decoration',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'decoration_list',
        meta: {
          icon: 'md-bookmark',
          title: '头像装饰'
        },
        component: () => import('@/view/decoration/list.vue')
      }
    ]
  },
  {
    path: '/link_white',
    name: 'link_white',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'link_white_list',
        meta: {
          icon: 'md-link',
          title: '链接白名单'
        },
        component: () => import('@/view/link-white/list.vue')
      }
    ]
  },
  {
    path: '/template',
    name: 'template',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'template_list',
        meta: {
          icon: 'md-browsers',
          title: '模板管理'
        },
        component: () => import('@/view/template/list.vue')
      }
    ]
  },
  {
    path: '/tutorials',
    name: 'tutorials',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'tutorials_list',
        meta: {
          icon: 'md-bookmarks',
          title: '教程管理'
        },
        component: () => import('@/view/tutorials/list.vue')
      }
    ]
  },
  {
    path: '/shan_page',
    name: 'shan_page',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'shan_page_list',
        meta: {
          icon: 'md-document',
          title: '闪页管理'
        },
        component: () => import('@/view/shan-page/list.vue')
      }
    ]
  },
  // {
  //   path: '/ad',
  //   name: 'ad',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'ad_management',
  //       meta: {
  //         icon: 'md-pie',
  //         title: '广告管理'
  //       },
  //       component: () => import('@/view/ad/list.vue')
  //     }
  //   ]
  // },
  {
    path: '/pay',
    name: 'pay',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'pay_list',
        meta: {
          icon: 'md-card',
          title: '支付渠道'
        },
        component: () => import('@/view/pay/list.vue')
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'order_list',
        meta: {
          icon: 'md-cart',
          title: '订单数据'
        },
        component: () => import('@/view/order/list.vue')
      }
    ]
  },
  {
    path: '/config',
    name: 'config',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'config_list',
        meta: {
          icon: 'md-settings',
          title: '配置管理'
        },
        component: () => import('@/view/config/list.vue')
      }
    ]
  },
  {
    path: '/tag',
    name: 'tag',
    component: Main,
    meta: {
      icon: 'md-pricetag',
      title: '标签'
    },
    children: [
      {
        path: 'list',
        name: 'tag_list',
        meta: {
          icon: 'md-pricetags',
          title: '标签管理'
        },
        component: () => import('@/view/tag/list.vue')
      }
    ]
  },
  {
    path: '/push',
    name: 'push',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'list',
        name: 'push_list',
        meta: {
          icon: 'md-cloud-upload',
          title: '推送任务(开发中)'
        },
        component: () => import('@/view/push/list.vue')
      }
    ]
  },
  {
    path: '/official',
    name: 'official',
    component: Main,
    meta: {
      icon: 'md-ionic',
      title: '公众号'
    },
    children: [
      {
        path: 'menu',
        name: 'official_menu',
        meta: {
          icon: 'md-menu',
          title: '菜单'
        },
        component: () => import('@/view/official/menu.vue')
      },
      {
        path: 'reply',
        name: 'official_reply',
        meta: {
          icon: 'md-quote',
          title: '回复(前端待开发)'
        },
        component: () => import('@/view/official/reply.vue')
      },
      {
        path: 'media',
        name: 'official_media',
        meta: {
          icon: 'md-planet',
          title: '素材库(前端待开发)'
        },
        component: () => import('@/view/official/media.vue')
      },
      {
        path: 'article',
        name: 'official_article',
        meta: {
          icon: 'md-bookmarks',
          title: '图文库(前端待开发)'
        },
        component: () => import('@/view/official/article.vue')
      }
    ]
  }
]
