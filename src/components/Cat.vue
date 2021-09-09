<template>
  <div>
    <!-- 受け取ったプロパティを利用する -->
    <!-- 受け取ったプロパティを演算したものを利用する -->
    <v-text :config="{text: text, x: textConfig.x, y:y }"></v-text>
  </div>
</template>

<script>
import Konva from 'konva'

export default {
  name: 'cat',
  data () {
    return {
      counter: 0
    }
  },
  props: [
    'text',
    'x',
    'y'
  ],
  watch: {
    counter: function () {

    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    // 受け取ったプロパティを演算
    textConfig: function () {
      return { x: parseInt(this.$props.x) + 200 }
    }
  },
  methods: {}
}
</script>
