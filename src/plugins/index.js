import axios from './axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faSearch, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from '../i18n'

export default {

  async install(Vue) {
    Vue.config.productionTip = false
    Vue.config.globalProperties.$serverUrl = process.env.APP_SERVER_URL || window.location.protocol + "//" + window.location.host
    Vue.config.globalProperties.$appVersion = process.env.APP_VERSION

    // axios 挂载全局
    Vue.config.globalProperties.$axios = axios

    Vue.use(i18n)

    // 按需加载 icon
    library.add(faHeart)
    library.add(faSearch)
    library.add(faLink)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }

}