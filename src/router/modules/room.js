export default {
  path: "/room",
  name: "room",
  component: () => import("@/views/room/index"),
  redirect: "/room/index",
  children: [
    {
      path: "index",
      meta: {
        title: "聊天室",
        keepAlive: true
      },
      component: () => import("@/views/room/children/index"),
    },
    {
      path: "roomInfo",
      name: "roomInfo",
      meta: {
        title: "聊天信息"
      },
      component: () => import("@/views/room/children/info")
    },
  ]
}