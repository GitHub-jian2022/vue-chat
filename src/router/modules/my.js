export default {
  path: "/my",
  component: () => import("@/views/my/index"),
  redirect: "/my/center",
  children: [
    {
      path: "center",
      meta: {
        title: "个人中心"
      },
      component: () => import("@/views/my/children/center")
    },
    {
      path: "set",
      meta: {
        title: "设置"
      },
      component: () => import("@/views/my/children/set")
    }
  ]
}