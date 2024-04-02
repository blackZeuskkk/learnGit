import './assets/main.css'

import { createApp, type App } from 'vue'
import { createPinia } from 'pinia'

import Index from './App.vue'
import Error from './Error.vue'
import router from './router'

const app = createApp(Index)
let err: App<Element> | never | undefined

app.config.errorHandler = (error) => {
  /* 处理错误 */
  err = createApp(Error)
  console.error(error)
}

app.use(createPinia())
app.use(router)

if (err) {
  err.mount('#err')
} else {
  app.mount('#app')
}
