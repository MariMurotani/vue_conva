<template>
  <div>
    <!-- 受け取ったプロパティを利用する -->
    <!-- 受け取ったプロパティを演算したものを利用する -->
    <v-text :config="{text: textConfig.text, x: textConfig.x, y:y }"></v-text>
  </div>
</template>

<script>
// import Konva from 'konva'

export default {
  name: 'cat',
  data () {
    return {
      intervalId: undefined,
      counter: 1,
      direction: true
    }
  },
  props: {
    text: {
      type: String
    },
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    callback: {
      type: Function,
      require: true
    }
  },
  watch: {
    counter: function () {

    }
  },
  created () {
  },
  mounted () {
    this.updateTimer()
  },
  computed: {
    // 受け取ったプロパティを演算
    textConfig: function () {
      return { x: this.$props.x + this.$data.counter * 10, text: this.$props.text + 'ฅ^•ω•^ฅ'}
    }
  },
  methods: {
    updateTimer: function () {
      const self = this
      this.intervalId = setInterval(function () {
        if (self.$data.counter === 0) {
          clearInterval(self.intervalId)
          // コールバック呼び出し
          this.$props.callback(this)
        } else if (self.$data.counter > 10) {
          this.$data.direction = !this.$data.direction
        }

        if (self.$data.direction) {
          self.$data.counter += 1
        } else {
          self.$data.counter -= 1
        }
      }.bind(this), 1000)
      // タイマー呼び出しはbind(this)をしないといけない
    }
  }
}
</script>
