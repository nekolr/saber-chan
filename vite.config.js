import { defineConfig, loadEnv } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [
    createVuePlugin(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': {
      'APP_VERSION': require('./package.json').version,
      'APP_SERVER_URL': loadEnv(mode, process.cwd()).VITE_APP_SERVER_URL
    }
  }
})
