import router from '../router'
import {MessageBox, Message} from 'element-ui'

export function interceptor (res) {
  if (res.code === 401 || res.code === 402) {
    // eslint-disable-next-line no-unused-expressions
    Message.error('未登录，请先登录')
    return router.push('/')
  } else {
    MessageBox.alert(res.msg, '警告', {
      confirmButtonText: '确定',
      callback: () => {
      }
    }).then(() => {})
  }
}
