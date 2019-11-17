const utils = (function () {
  return {
    getFormatDate: getFormatDate,
    getTableData: getTableData,
    turnEng: turnEng,
    formatStringtoDate: formatStringtoDate,
    formatTime: formatTime
  }
  // 获取当前时间
  function getFormatDate () {
    var date = new Date()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    if (date.getMinutes() >= 0 && date.getMinutes() <= 9) {
      minutes = '0' + date.getMinutes()
    }
    if (date.getSeconds() >= 0 && date.getSeconds() <= 9) {
      seconds = '0' + date.getSeconds()
    }
    var currentDate = date.getFullYear() + '-' + month + '-' + strDate + ' ' + date.getHours() + ':' + minutes + ':' + seconds
    return currentDate
  }
  // 通过传入数据集以及页数和条数，可返回对应的数据集
  function getTableData (list, page, size) {
    let data = []
    if (list.length !== 0) {
      data = list.slice((page - 1) * size, page * size)
      // console.log(setData)
      return data
    } else {
      return data
    }
  }
  // 传入序号返回对应的大写字母
  function turnEng (num) {
    let result = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return result[num]
  }
  // 日期格式化
  function formatTime (date, format) {
    if (!date) return '-'
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    var paddNum = function (num) {
      num += ''
      return num.replace(/^(\d)$/, '0$1')
    }
    // 指定格式字符
    var cfg = {
      yyyy: date.getFullYear(), // 年 : 4位
      yy: date.getFullYear().toString().substring(2), // 年 : 2位
      M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
      MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
      d: date.getDate(), // 日 : 如果1位的时候不补0=
      dd: paddNum(date.getDate()) // 日 : 如果1位的时候补0
    }
    format || (format = 'yyyy-MM-dd')
    return format.replace(/([a-z])(\1)*/ig, function (m) {
      return cfg[m]
    })
  }
  // ysq日期格式 date转化为 '2019-07-01' 如果存在具体时分秒，返回'2019-07-01 16:00:00'
  function formatStringtoDate (date) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    if (date.getHours() !== '') {
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      var second = date.getSeconds()
      second = minute < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    } else {
      return y + '-' + m + '-' + d
    }
  }
})()
export default {
  install (Vue) {
    Vue.prototype.$utils = utils
  }
}
