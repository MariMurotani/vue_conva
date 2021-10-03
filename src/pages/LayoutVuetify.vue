<template>
  <v-layout align-left>
    <v-flex align-self-start>
      <card-list></card-list>
    </v-flex>
    <v-flex align-self-start>
      <card-list></card-list>
    </v-flex>
  </v-layout>
</template>
<script>
import CardList from '../components/CardList'

export default {
  // 自作コンポーネントを利用可能にする
  components: {
    CardList
  },
  data () {
    return {}
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  beforeDestroy: function () {
  },
  computed: {
  },
  methods: {

  }
}
</script>
