<template>
  <div class="content_main">
    test
    <v-subheader>SubHeaderTest</v-subheader>
    <v-skeleton-loader></v-skeleton-loader>
    <v-icon aria-hidden="false">
      mdi-account
    </v-icon>
    <v-icon>{{ account }}</v-icon>
    <v-icon>{{ check }}</v-icon>
  </div>
</template>
<script>
import { mdiAccount, mdiCheck } from '@mdi/js'

export default {
  // 自作コンポーネントを利用可能にする
  components: {
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
