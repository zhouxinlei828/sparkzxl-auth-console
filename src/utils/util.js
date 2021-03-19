export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
    ? '上午好'
    : hour <= 13
    ? '中午好'
    : hour < 20
    ? '下午好'
    : '晚上好'
}

export function welcome() {
  const arr = [
    '休息一会儿吧',
    '准备吃什么呢?',
    '要不要打一把 DOTA',
    '我猜你可能累了',
    '喝杯咖啡休息下吧☕',
  ]
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl(path) {
  return reg.test(path)
}

export const downloadFile = (response) => {
  const res = response.data
  const contentType = response.headers['content-type']
  if (contentType.includes('application/json')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target.readyState === 2) {
        const data = JSON.parse(e.target.result)
        this.$message({
          message: data.msg,
          type: 'warning',
        })
      }
    }
    reader.readAsText(res)
  } else {
    const disposition = response.headers['content-disposition']
    let fileName = '下载文件.zip'
    if (disposition) {
      const respcds = disposition.split(';')
      for (let i = 0; i < respcds.length; i++) {
        const header = respcds[i]
        if (header !== null && header !== '') {
          const headerValue = header.split('=')
          if (headerValue !== null && headerValue.length > 0) {
            if (headerValue[0].trim().toLowerCase() === 'filename') {
              fileName = decodeURI(headerValue[1])
              break
            }
          }
        }
      }
    }
    // 处理引号
    if (
      (fileName.startsWith("'") || fileName.startsWith('"')) &&
      (fileName.endsWith("'") || fileName.endsWith('"'))
    ) {
      fileName = fileName.substring(1, fileName.length - 1)
    }

    const blob = new Blob([res], {
      type: 'application/vnd.ms-excel;charset=utf-8',
    })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * 判断数组中是否包含某个元素
 * @param array
 * @param str
 * @returns {*}
 */
export function arrayContain(array, str) {
  const index = array.findIndex((item) => item === str)
  return index !== -1
}

/**
 * 删除数组中的元素
 * @param array
 * @param value
 */
export function arrayRemove(array, value) {
  Array.prototype.remove = function (val) {
    const index = this.indexOf(val)
    if (index > -1) {
      return this.splice(index, 1)
    }
  }
  array.remove(value)
}
