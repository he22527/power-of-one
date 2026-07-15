import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 專案站台掛在子路徑底下（he22527.github.io/power-of-one/），
  // 打包後的資源路徑必須跟著加前綴，否則線上會全部 404。
  // 換 repo 名稱或改用自訂網域時，這裡要一起改。
  base: '/power-of-one/',
})
