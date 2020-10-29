import Vue from "vue"

/*
* 处理播放量
* */
Vue.filter("handlePlayCount", function (playCount) {
  if (parseInt(playCount / 100000000) >= 1) {
    return parseInt(playCount / 100000000) + "亿"
  } else if (playCount > 10000) {
    return parseInt(playCount / 10000) + "万"
  } else {
    return parseInt(playCount)
  }
})

/*
* 处理播放时间
* */
Vue.filter("formatPlayTime", function(time) {
  // 1. 将毫秒转化为分
  let m = parseInt(time / (1000 * 60))
  let s = parseInt(((time % (1000 * 60)) / 1000) % 60)
  if (m <= 9) {
    m = "0" + m
  }
  if (s < 10) {
    s = "0" + s
  }
  return m + ":" + s
})
