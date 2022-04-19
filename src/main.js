import { createApp } from 'vue'
import store from './store/index'
import App from './App.vue'
import router from './router'

// 全局插件
import Plugins from './plugins/index'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(Plugins)
  .mount('#app')
