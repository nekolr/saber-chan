import { createRouter, createWebHashHistory } from "vue-router"
import ImageUpload from "@/components/ImageUpload.vue"
import Login from "@/views/Login.vue"
import Images from "@/views/Images.vue"

const routes = [
  {
    path: '/',
    name: 'Root',
    components: {
      content: ImageUpload
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      content: Login
    }
  },
  {
    path: '/images',
    name: 'Images',
    components: {
      content: Images
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;