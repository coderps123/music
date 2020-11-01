
const state = {
  // 用户的个人信息
  profile: JSON.parse(window.localStorage.getItem("profile")) || null,
  // 控制播放暂停按钮的显隐
  isPlay: false,
  // 播放
  playList: [],
  // 当前播放歌曲对象
  currentSong: {},
  // 播放记录列表
  playRecord: JSON.parse(window.localStorage.getItem("playRecord")) || [],
  // audio 元素
  audio: null,
  // 当前播放歌曲的索引值
  currentSongIndex: 0,
  // 播放模式 ("orderPlay", "oneLoop", "randomPlay") // 默认就是 orderPlay
  playMode: "orderPlay",
  // 历史搜索
  historySearch: JSON.parse(window.localStorage.getItem("historySearch")) || []
}

export default state
