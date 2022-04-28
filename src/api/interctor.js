import router from '../router'
import {MessageBox} from 'element-ui'

export function interceptor (res) {
  if (res.code === 401 || res.code === 403) {
    return router.push('/')
  } else {
    MessageBox.alert(res.msg, '警告', {
      confirmButtonText: '确定',
      callback: () => {
      }
    }).then(() => {})
  }
}
