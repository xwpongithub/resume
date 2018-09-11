<template>
    <pre ref="text" id="style-text" v-html="text"></pre>
</template>

<script>
  import {writeMixin} from '../../common/js/mixin'
  import {handleChar} from '../../common/js/util'

  export default {
    name: 'style-text',
    mixins: [writeMixin],
    props: {
      cssText: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        styleText: this.cssText
      }
    },
    methods: {
      async write(index) {
        await this.writeTo(this.$el, this.styleText[index], 0, this.speed, true, 1)
      },
      writeToEnd() {
        let txt = this.styleText.join('\n')

        let styleHTML = ''
        for (let i = 0; i < txt.length; i++) {
          styleHTML = handleChar(styleHTML, txt[i])
        }
        this.text = styleHTML
        this.$root.$emit('styleOverwrite', '#work-text * {transition: none; }' + txt)
      }
    },
    watch: {
      cssText(val) {
        let txt = val.join('\n')
        let styleHTML = ''
        for (let i = 0; i < txt.length; i++) {
          styleHTML = handleChar(styleHTML, txt[i])
        }
        this.text = styleHTML
      }
    }
  }
</script>
