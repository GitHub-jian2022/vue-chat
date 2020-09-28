import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

import RoomRoutes from './modules/room'
import MyRoutes from './modules/my'

const router = new Router({
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index"),
      meta: {
        title: "登陆"
      }
    },
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: () => import("@/views/index/index"),
      meta: {
        title: "首页",
        // 缓存首页
        keepAlive: true
      }
    },
    {
      path: "/contact",
      meta: {
        title: "通讯录"
      },
      component: () => import("@/views/contact/index")
    },
    {
      path: "/cart",
      meta: {
        title: "购物车"
      },
      component: () => import("@/views/cart/index")
    },
    MyRoutes,
    RoomRoutes,
    
    {
      path: "*",
      component: () => import("@/components/NotFound")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // keep-alive 返回缓存页面后记录浏览位置
　　　//scrollBehavior 滚动行为
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition;
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          x: 0,
          y: 1
        });
      }, 0);
    });
  }
});

router.beforeEach((to, from, next) => {
  let { title, needLogin } = to.meta;
  let { isLogin } = store.state;
  document.title = title;

  if (needLogin && !isLogin) {
    next({
      path: "/login"
    });
  } else {
    next();
  }
});

export default router;
