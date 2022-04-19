import zhCN from './zh-CN'
import enUS from './en-US'
import { createI18n } from 'vue-i18n'

const messages = {
  'zh-CN': {
    '_lang': '简体中文',
    ...zhCN
  },
  'en-US': {
    '_lang': 'English',
    ...enUS
  }
}

const i18n = createI18n({
  locale: 'zh-CN',
  messages,
  legacy: false
})

export default i18n