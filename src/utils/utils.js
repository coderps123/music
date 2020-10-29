export default {
  /**
   * 时间戳转分秒
   */

  /*
  * 格式化时间戳
  */
  formatDate(time, number) {
    let date = new Date(time) // 如果time是13位, 则不需要乘1000
    let Y = date.getFullYear() + "-"
    let M = ((date.getMonth() + 1) < 10) ? ("0" + (date.getMonth() + 1) + "-") : ((date.getMonth() + 1) + "-")
    let D = ((date.getDay() < 10) ? ("0" + date.getDay()) : date.getDay()) + " "
    let h = ((date.getHours() < 10) ? ("0" + date.getHours()) : date.getHours()) + ":"
    let m = ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes()) + ":"
    let s = (date.getSeconds() < 10) ? ("0" + date.getSeconds()) : date.getSeconds()
    switch (number) {
      case 3:
        return h+m+s;
      case 6:
        return Y+M+D+h+m+s
      default:
        return Y+M+D
    }
  },
}
