<template>
  <div id="app">
    <div v-show="showLang" class="languages">
      <ul>
        <li @click="switchLang(item.value)" :key="item.value" v-for="item in languages" :class="{active: currentLang === item.value}">{{item.text}}</li>
      </ul>
    </div>
    <style-text ref="styleText" :cssText="cssText"></style-text>
    <work-text ref="workText" :sourceText="text"></work-text>
    <v-footer ref="footer"></v-footer>
  </div>
</template>

<script>
  import StyleText from './components/style-text/style-text'
  import WorkText from './components/work-text/work-text'
  import VFooter from './components/footer/footer'
  import Promise from 'bluebird'
  import {getLanguage} from './common/js/util'

  function getText(lang) {
    if (lang === undefined) lang = getLanguage()
    return lang === 'ja' ? require('./components/work-text/work-ja.txt') : require('./components/work-text/work-zh.txt')
  }

  function getStyleText(lang) {
    if (lang === undefined) lang = getLanguage()
    return [0, 1, 2].map((i) => {
      if (lang === 'ja') return require('!raw-loader!./components/style-text/styles' + i + '-ja.css')
      else if (lang === 'zh') return require('!raw-loader!./components/style-text/styles' + i + '.css')
    })
  }

  export default {
    name: 'App',
    data() {
      return {
        showLang: false,
        currentLang: getLanguage(),
        languages: [{value: 'zh', text: '简体中文'}, {text: '日本語', value: 'ja'}],
        text: getText(),
        cssText: getStyleText()
      }
    },
    mounted() {
      this.startAnimation()
    },
    methods: {
      async startAnimation() {
        try {
          await this.$refs.styleText.write(0)
          await this.$refs.workText.write()
          await this.$refs.styleText.write(1)
          this.$refs.workText.showWorkBox()
          await Promise.delay(2000)
          await this.$refs.styleText.write(2)
          this.$refs.footer.end()
          this.showLang = true
        } catch (e) {
          if (e.message === 'SKIP IT') {
            this.surprisinglyShortAttentionSpan()
          } else {
            throw e
          }
        }
      },
      surprisinglyShortAttentionSpan() {
        this.$refs.styleText.writeToEnd()
        this.$refs.workText.showWorkBox()
        this.$refs.footer.end()
        this.showLang = true
      },
      switchLang(lang) {
        this.currentLang = lang
        this.text = getText(lang)
        this.cssText = getStyleText(lang)
      }
    },
    components: {
      VFooter,
      StyleText,
      WorkText
    }
  }
</script>

<style lang="stylus">
  #app
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom:40px
    .languages
      position: absolute
      left: 50%
      top:0
      z-index:1000
      transform:translateX(-50%)
      ul
        list-style: none
        display: flex
        padding: 5px
        background-color: #eee
        box-sizing: border-box
        border: 4px solid #e69f0f
        color: #666
        border-radius: 4px
        box-shadow: 0 1px 3px rgba(0,0,0,.7)
        li
          font-size:20px
          color:#666
          &:first-child
            margin-right:10px
          &.active
            color:#E69F0F
            text-decoration:underline
</style>
