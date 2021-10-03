<template>
  <v-list dense>
    <v-list-item v-for="item in 5">
      <v-list-item-content>
        <card-type3></card-type3>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
import CardType3 from '../components/CardType3'

export default {
  name: 'card-list',
  // 自作コンポーネントを利用可能にする
  components: {
    CardType3
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
