import Vue from 'vue'
import App from './App.vue'

import './common/stylus/index.styl'

Vue.config.productionTip = false

const app = new Vue({
  created() {
    this.paused = false
    this.animationSkipped = false
  },
  render: h => h(App)
}).$mount('#app')

let styleTagEl = document.getElementById('style-tag')
app.$on('styleAppend', styleText => {
  styleTagEl.textContent += styleText
})

app.$on('styleOverwrite', styleText => {
  styleTagEl.textContent = styleText
})

app.$on('togglePause', function(state) {
  this.paused = state === 1
})

app.$on('skip', function() {
  this.animationSkipped = true
})
