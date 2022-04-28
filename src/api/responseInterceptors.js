import axios from 'axios'
import router from '../router'

axios.interceptors.response.use(response => {
  const res = response.data || {}

  if (res.code === 200) {
    return Promise.resolve(res)
  } else if (res.code === 401 || res.code === 403) {
    return router.replace({
      path: '/'
    })
  }
})
