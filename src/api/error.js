import {MessageBox} from 'element-ui'

export function error (message) {
  MessageBox.alert(message, '警告', {confirmButtonText: '确定', callback: () => {}})
}
