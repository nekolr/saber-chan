export default {
  namespaced: true,
  state: {
    // 原始链接
    link: '',
    // 包装的链接
    wrappedLink: '',
    // 是否显示
    showShare: false,
    // origin button type
    originType: 'primary',
    // html button type
    htmlType: 'default',
    // markdown button type
    markdownType: 'default'
  },
  getters: {
    getLink(state) {
      return state.link
    },
    getWrappedLink(state) {
      return state.wrappedLink
    },
    getShowShare(state) {
      return state.showShare
    },
    getOriginType(state) {
      return state.originType
    },
    getHtmlType(state) {
      return state.htmlType
    },
    getMarkdownType(state) {
      return state.markdownType
    }
  },
  mutations: {
    setLink(state, link) {
      state.link = link
    },
    setWrappedLink(state, wrappedLink) {
      state.wrappedLink = wrappedLink
    },
    setShowShare(state, showShare) {
      state.showShare = showShare
    },
    setOriginType(state, originType) {
      state.originType = originType
    },
    setHtmlType(state, htmlType) {
      state.htmlType = htmlType
    },
    setMarkdownType(state, markdownType) {
      state.markdownType = markdownType
    }
  }
}