import router from '../router'
import {MessageBox} from 'element-ui'

export function interceptor (res) {
  if (res.code === 401 || res.code === 402) {
    return router.push('/')
  } else {
    MessageBox.alert('未登录，请先登录', '警告', {
      confirmButtonText: '确定',
      callback: () => {
      }
    }).then(() => {})
  }
}
