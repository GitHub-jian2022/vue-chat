

const conversationModules = {
	namespaced: true,
	state: {
		currentConversation: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		currentMessageList: [], //消息列表
		nextReqMessageID: '',
    isCompleted: false, // 当前会话消息列表是否已经拉完了所有消息
    conversationList: []//会话列表
	},
	getters: {
		toAccount: state => {
      if (!state.currentConversation || !state.currentConversation.conversationID) {
        return ''
      }
      switch (state.currentConversation.type) {
        case 'C2C':
          return state.currentConversation.conversationID.replace('C2C', '')
        case 'GROUP':
          return state.currentConversation.conversationID.replace('GROUP', '')
        default:
          return state.currentConversation.conversationID
      }
    },
		currentConversationType: state => {
			if (!state.currentConversation || !state.currentConversation.type) 			{
				return ''	
			}
			return state.currentConversation.type
		},

	},
	mutations: {
		//选择好友聊天--创建会话/拼接会话id
		createcurrentConversation(state, currentConversation) {
			console.log('currentConversation: ', currentConversation);
			state.currentConversation = currentConversation
			state.currentMessageList = []
			state.nextReqMessageID = ''
      state.isCompleted = false
		},
		//选择已有会话聊天--更新选中会话详情
		updatecurrentConversation(state, conversationItem) {
			console.log('updatecurrentConversation',conversationItem)
			state.currentConversation = Object.assign({}, conversationItem);
			state.toUserId = conversationItem.userProfile.userID
			state.currentMessageList = []
			state.nextReqMessageID = ''
      state.isCompleted = false
		},
		//
		updateNextReqMessageID(state,nextReqMessageID){
			state.nextReqMessageID = nextReqMessageID
		},
		updateIsCompleted(state,isCompleted){
			state.isCompleted = isCompleted
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			console.log('更新会话列表',newConversationList)
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			// console.log('插入消息',data)
			// 还没当前会话，则跳过
			if (!state.currentConversation.conversationID) {
				console.log('还没当前会话')
        return
      }
			if (Array.isArray(data)) {
				// 筛选出当前会话的消息
				const result = data.filter(item => item.conversationID === state.currentConversation.conversationID)
				console.log('result',result)
				state.currentMessageList = [...state.currentMessageList, ...result]
			} else if (data.conversationID === state.currentConversation.conversationID) {
				console.log('插入1条消息',data)
				state.currentMessageList = [...state.currentMessageList, data]
			}
			console.log('当前会话',JSON.parse(JSON.stringify(state.currentMessageList)))
		},
		/**
     * 从当前消息列表中删除某条消息
     * @param {Object} state
     * @param {Message} message
     */
    removeMessage(state, message) {
      const index = state.currentMessageList.findIndex(({ ID }) => ID === message.ID)
      if (index >= 0) {
        state.currentMessageList.splice(index, 1)
      }
    },
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state, data) {
			console.log(data)
			if (data) {
				state.currentMessageList = [...data, ...state.currentMessageList]
			}
		},
	},
	actions: {
		
	}
}

export default conversationModules