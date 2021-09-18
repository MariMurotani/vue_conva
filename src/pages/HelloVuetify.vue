<template>
  <splitpanes class="default-theme" style="height: 400px">
    <pane min-size="20">
      <card-type1 class="card-type1"></card-type1>
    </pane>
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
import CardType1 from '../components/CardType1'

export default {
  // 自作コンポーネントを利用可能にする
  components: {
    Splitpanes,
    Pane,
    CardType1
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
  .splitpanes__pane {
    justify-content: center;
    align-items: center;
    display: flex;
    overflow-y: scroll;
  }
</style>
