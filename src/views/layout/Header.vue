<template>
  <header>
    <div class="header" :trigger="['click']">
      <a class="logo" :href="baseUrl">
        <svg class="animation" height="30" width="105" xmlns="http://www.w3.org/2000/svg">
          <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #fb9a40" stroke="#fb9a40" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-family="saber-chan" font-size="30">Saber 酱
            <animate attributeName="stroke-dashoffset" begin="-2s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
          </text>
          <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #f38181" stroke="#f38181" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-size="30" font-family="saber-chan">Saber 酱
            <animate attributeName="stroke-dashoffset" begin="-4s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
          </text>
          <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #ffb4ac" stroke="#ffb4ac" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-size="30" font-family="saber-chan">Saber 酱
            <animate attributeName="stroke-dashoffset" begin="-6s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
          </text>
          <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #7189bf" stroke="#7189bf" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-size="30" font-family="saber-chan">Saber 酱
            <animate attributeName="stroke-dashoffset" begin="-8s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
          </text>
        </svg>
        <svg class="text" height="30" width="105" xmlns="http://www.w3.org/2000/svg">
          <text font-family="saber-chan" font-size="30" fill="#777" y="100%" x="0">Saber 酱</text>
        </svg>
      </a>
      <div class="r-dropdown">
        <a-dropdown v-if="userInfo">
          <a class="ant-dropdown-link" @click.prevent>
            {{ userInfo.username }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu @click="handleDropdown">
              <a-menu-item key="images">{{ $t("user.myImages") }}</a-menu-item>
              <a-menu-item key="logout">{{ $t("user.logout") }}</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a v-if="!userInfo" @click="login" href="javascript:void(0)">{{
          $t("user.login")
        }}</a>
      </div>
    </div>
  </header>
</template>

<script>
import "ant-design-vue/es/modal/style/css";
import { DownOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import { userApi } from "@/apis/user";
import { useStore } from "vuex";

export default {
  name: "Header",
  components: {
    DownOutlined,
  },
  data() {
    return {
      baseUrl: window.location.protocol + "//" + window.location.host,
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    // 获取当前用户信息
    const getUserInfo = () => {
      if (route.path === "/login") {
        return new Promise((resolve) => {
          resolve();
        });
      } else {
        return userApi
          .getCurrentUserInfo()
          .then((res) => {
            store.commit("user/set", res);
          })
          .catch(() => {
            router.push({
              name: "Login",
            });
          });
      }
    };

    // 登录
    const login = () => {
      router.push({
        name: "Login",
      });
    };

    // 处理 dropdown
    const handleDropdown = (event) => {
      if (event.key === "logout") {
        store.dispatch("account/logout", { confirm: true });
      }
      if (event.key === "images") {
        router.push({
          name: "Images",
        });
      }
    };

    onMounted(() => {getUserInfo()})

    return {
      login,
      handleDropdown,
      userInfo: computed(() => store.getters["user/getUser"]),
    };
  },
};
</script>

<style>
@media (min-width: 768px) {
  .header {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .header {
    width: 880px;
  }
}

@media (min-width: 1200px) {
  .header {
    width: 980px;
  }
}

header {
  background: #f8f8f8;
}

.header {
  margin: 0 auto;
}

.header a {
  text-decoration: none;
}

/* Saber chan */
.saber-chan {
  font-family: "saber-chan";
}

@font-face {
  font-family: "saber-chan";
  src: url("@/assets/saber-chan.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

svg.text {
  display: inline;
  opacity: 1;
  width: auto;
  transition: 0.5s;
}

svg.animation {
  display: inline;
  opacity: 0;
  width: 0;
  transition: 0.5s;
}

a.logo:hover svg.text {
  opacity: 0;
  width: 0;
}

a.logo:hover svg.animation {
  opacity: 1;
  width: auto;
}

a.logo {
  font-weight: 600;
  display: inline-block;
  margin: 15px 0 15px 10px;
  width: 105px;
}

a.me {
  color: #777;
  font-size: 15px;
  float: right;
  margin-top: 28px;
  margin-right: 10px;
  font-weight: 400;
}

.r-dropdown {
  float: right;
  margin-top: 32px;
  margin-right: 10px;
  font-size: 14px;
}
</style>