

export default {
  namespaced: true,
  state: {
    currentUserProfile: {},
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready
    token: '',
    roles: [],
  },
  mutations: {
    updateToken(state, payload) {
      state.token = payload;
    },
    updateRoles(state, payload) {
      state.roles = payload;
    },

    //更新登录用户信息
		updateCurrentUserProfile(state, userProfile) {
			console.log('updateCurrentUserProfile',userProfile)
			state.currentUserProfile = userProfile
		},
		//更新登录状态
		toggleIsLogin(state, isLogin) {
			console.log('toggleIsLogin',isLogin)
			state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
			console.log('isSDKReady',isSDKReady)
			state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//退出登录重置状态
		reset(state) {
			console.log('reset')
			Object.assign(state, {
				currentUserProfile: {},
				isLogin: false,
				isSDKReady: false, // TIM SDK 是否 ready
				token: '',
				roles: [],
			})
		},
  },
  actions: {

  }
}