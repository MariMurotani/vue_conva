<template>
  <splitpanes class="default-theme" style="height: 400px">
    <pane min-size="20">1</pane>
    <pane>
      <splitpanes horizontal>
        <pane>2</pane>
        <pane>3</pane>
        <pane>4</pane>
      </splitpanes>
    </pane>
    <pane>5</pane>
  </splitpanes>
</template>
<script>
import { mdiAccount, mdiCheck } from '@mdi/js'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  // 自作コンポーネントを利用可能にする
  components: {
    Splitpanes,
    Pane
  },
  data () {
    return {
      account: mdiAccount,
      check: mdiCheck,
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  computed () {
  },
  methods: {
  }
}
</script>
<style>
  splitpanes {}
</style>
