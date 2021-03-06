<template>
  <pre id="work-text" :class="workCls" v-show="show">
    <div v-if="preview" v-html="text"></div><div v-else>
      <div ref="text" class="text" v-html="workText"></div>
      <div ref="md" class="md" v-html="mdText"></div>
    </div>
  </pre>
</template>

<script>
  import { writeMixin } from '../../common/js/mixin'
  import Promise from 'bluebird'
  import Markdown from 'markdown'
  import wheel from 'mouse-wheel'

  const toHTML = Markdown.markdown.toHTML

  export default {
    name: 'work-text',
    mixins: [writeMixin],
    props: {
      sourceText: String
    },
    data() {
      return {
        flipped: false,
        preview: true,
        show: false,
        workText: this.sourceText,
        mdText: toHTML(this.sourceText)
      }
    },
    computed: {
      workCls() {
        return this.flipped ? 'flipped' : ''
      }
    },
    methods: {
      async write() {
        this.show = true
        await this.writeTo(this.$el, this.workText, 0, this.speed, false, 1)
      },
      showWorkBox() {
        this.show = true
        this.preview = false
        this.flipped = true
        this.$nextTick(() => {
          this.$el.scrollTop = 9999
          let flipping = false
          wheel(this.$el, async function (dx, dy) {
            if (flipping) {
              return
            }
            let half = (this.$el.scrollHeight - this.$el.clientHeight) / 2
            let pastHalf = this.flipped ? this.$el.scrollTop < half : this.$el.scrollTop > half

            if (pastHalf) {
              this.flipped = !this.flipped
              flipping = true
              await Promise.delay(500)
              this.$el.scrollTop = this.flipped ? 9999 : 0
              flipping = false
            }

            this.$el.scrollTop += (dy * (this.flipped ? -1 : 1))
          }.bind(this), true)
        })
      }
    },
    watch: {
      sourceText(val) {
        this.workText = val
        this.mdText = toHTML(val)
      }
    }
  }
</script>
