
// 用户的个人信息
export const setProfile = (state, payload) => {
  state.profile = payload
}

// 控制播放暂停按钮的显隐
export const isPlayMutation = (state, payload) => {
  state.isPlay = payload
}

// 清空播放记录
export const deleteAll = (state, payload) => {
  state.playRecord = []
}

// 移除播放记录某一项
export const removeItem = (state, index) => {
  state.playRecord.splice(index, 1)
}

// 上一首歌曲
export const setPlayPrevSong = (state) => {
  if (state.playList.indexOf(state.currentSong) === 0) {
    state.currentSong = state.playList[state.playList.length-1]
  } else {
    state.currentSong = state.playList[state.playList.indexOf(state.currentSong) - 1]
  }
  // 将当前歌曲加入到播放记录列表中
  addPlayRecord(state)
}

// 下一首歌曲
export const setPlayNextSong = (state) => {
  console.log(state.playList);
  if (state.playList.indexOf(state.currentSong) === state.playList.length - 1) {
    state.currentSong = state.playList[0]
  } else {
    state.currentSong = state.playList[state.playList.indexOf(state.currentSong) + 1]
  }
  // 将当前歌曲加入到播放记录列表中
  addPlayRecord(state)
}

// 将当前歌曲加入到播放记录列表中, 并去重
export const addPlayRecord = state => {
  let index = state.playRecord.findIndex(item => state.currentSong.id === item.id)
  if (index !== -1) {
    state.playRecord.splice(index, 1)
    state.playRecord.unshift(state.currentSong)
  } else {
    state.playRecord.unshift(state.currentSong)
  }
}

// 获取 audio 元素
export const getAudio = (state, audio) => {
  state.audio = audio
}

// 播放
export const play = state => {
  state.audio.play()
}

// 暂停
export const pause = state => {
  state.audio.pause()
}

// 设置当前歌曲(在playMode 为: "random" 时调用)
export const setCurrentSong = (state, payload) => {
  state.currentSong = payload
}

// 设置播放列表
export const setPlayList = (state, payload) => {
  state.playList = payload
}

// 设置播放图标的显示
export const setIsPlay = (state, payload) => {
  state.isPlay = payload
}

// 设置播放模式
export const setPlayMode = (state, payload) => {
  state.playMode = payload
}

// 设置错误信息
export const setCurrentSongError = (state, payload) => {
  state.currentSong.error = payload
}

// 设置历史搜索记录
export const setHistorySearch = (state, payload) => {
  let index = state.historySearch.indexOf(payload)
  if (index !== -1) {
    state.historySearch.splice(index, 1)
    state.historySearch.unshift(payload)
  } else {
    state.historySearch.unshift(payload)
  }
}

// 删除历史搜索记录某一项
export const deleteHistorySearchItem = (state, index) => {
  state.historySearch.splice(index, 1)
}

// 清空搜索历史
export const clearHistorySearch = (state, payload) => {
  state.historySearch = []
}

// 设置登录状态
export const setLoginStatus = (state, payload) => {
  console.log(payload)
  state.loginStatus = payload
}


