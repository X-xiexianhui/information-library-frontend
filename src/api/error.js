import {MessageBox} from 'element-ui'
import router from '../router'

export function error (res) {
  if (res.code === 401 || res.code === 403) {
    return router.push('/')
  } else {
    MessageBox.alert(res.message, '警告', {
      confirmButtonText: '确定',
      callback: () => {
      }
    }).then(() => {})
  }
}
