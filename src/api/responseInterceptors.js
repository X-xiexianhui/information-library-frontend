import axios from 'axios'
import router from '../router'

axios.interceptors.response.use(response => {
  const res = response.data || {}

  if (res.data.code === 200) {
    return Promise.resolve(res)
  } else if (res.data.code === 401 || res.data.code === 403) {
    return router.replace({
      path: '/'
    })
  }
})
