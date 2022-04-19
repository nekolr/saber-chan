import cookies from '@/utils/cookies'
import router from '@/router'
import { Modal } from 'ant-design-vue'
import i18n from '@/i18n'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param response 登录后获得的信息
     */
    login({ commit }, response) {
      return new Promise(resolve => {
        cookies.set('token', response.token)
        // 填充 vuex 用户信息
        commit('user/set', response.user, { root: true })
        // 结束
        resolve()
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param i18n
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout({ commit }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout() {
        // 删除cookie
        cookies.remove('token')
        // 清空 vuex 用户信息
        commit('user/set', {}, { root: true })
        // 跳转路由
        router.push({
          name: 'Login'
        })
      }
      // 判断是否需要确认
      if (confirm) {
        Modal.confirm({
          title: i18n.global.t('user.logout'),
          content: i18n.global.t('user.confirmLogout'),
          onOk: () => {
            logout()
          },
          onCancel: () => {
            return
          }
        })
      } else {
        logout()
      }
    }
  }
}