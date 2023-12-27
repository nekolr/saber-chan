<template>
  <div class="p-login">
    <a-card :title="t('user.pleaseLogin')">
      <a-form class="pb-form">
        <a-form-item v-bind="validateInfos.username">
          <a-input
            v-model:value="modelRef.username"
            :placeholder="t('user.inputUsername')"
            @pressEnter="handleLogin"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item v-bind="validateInfos.password">
          <a-input-password
            v-model:value="modelRef.password"
            :placeholder="t('user.inputPassword')"
            @pressEnter="handleLogin"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            block
            :loading="loading"
            @click="handleLogin"
            >{{ t("user.login") }}</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { accountApi } from "@/apis/account";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { Form } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
const useForm = Form.useForm;

export default defineComponent({
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const modelRef = reactive({
      username: "",
      password: "",
    });

    const state = reactive({
      loading: false,
    });

    const rulesRef = reactive({
      username: [
        {
          required: true,
          message: t("user.usernameRequired"),
        },
      ],
      password: [
        {
          required: true,
          message: t("user.passwordRequired"),
        },
      ],
    });

    const { validate, validateInfos } = useForm(modelRef, rulesRef);

    const handleLogin = () => {
      state.loading = true;
      validate()
        .then(() => {
          accountApi
            .login(modelRef)
            .then(async (res) => {
              // 关闭 loading
              state.loading = false;
              store.dispatch("account/login", res);
              // 重定向对象不存在则返回顶层路径
              router.replace(route.query.redirect || "/");
            })
            .catch(() => {
              // 关闭 loading
              state.loading = false;
            });
        })
        .catch((err) => {
          state.loading = false;
        });
    };

    return {
      validate,
      validateInfos,
      modelRef,
      t,
      handleLogin,
      ...toRefs(state),
    };
  },
});
</script>

<style>
.p-login {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
  background-color: #ececec;
  width: 320px;
  padding: 1px;
}

.pb-form {
  margin: 10px, 0px, 10px, 0px;
}
</style>