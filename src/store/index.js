import { createStore } from 'vuex'

import links from './modules/links'
import account from './modules/account'
import user from './modules/user'

export default createStore({
  modules: {
    links,
    account,
    user
  }
})