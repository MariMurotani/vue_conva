<template>
  <v-row>
    <v-col class="mx-1 my-1">
      <card-type3></card-type3>
    </v-col>
    <v-col class="mx-1 my-1">
      <card-type3></card-type3>
    </v-col>
  </v-row>
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
