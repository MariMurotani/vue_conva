<template>
  <v-row>
    <v-col class="mx-1 my-1">
      <card-type1></card-type1>
    </v-col>
    <v-col class="mx-1 my-1">
      <card-type1></card-type1>
    </v-col>
  </v-row>
</template>
<script>
import CardType1 from '../components/CardType1'
export default {
  name: 'card-list',
  // 自作コンポーネントを利用可能にする
  components: {
    CardType1
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
