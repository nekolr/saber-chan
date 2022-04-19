<template>
  <a-config-provider
    :autoInsertSpaceInButton="autoInsertSpaceInButton"
    :locale="locale"
  >
    <div id="app">
      <Header />
      <router-view name="content"></router-view>
      <Links />
      <!-- 只起到占位的作用 -->
      <div class="s-placeholder"></div>
      <Footer />
    </div>
  </a-config-provider>
</template>

<script>
import "ant-design-vue/es/message/style/css";
import Header from "./views/layout/Header.vue";
import Links from "./components/Share.vue";
import Footer from "./views/layout/Footer.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

export default {
  name: "app",
  components: {
    Header,
    Links,
    Footer,
  },
  data() {
    return {
      autoInsertSpaceInButton: false,
      locale: zhCN,
    };
  },
};
</script>

<style>
body {
  margin: 0px auto;
}

.s-placeholder {
  height: 42px;
}
</style>