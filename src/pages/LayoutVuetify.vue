<template>
    <v-container class="grey">
      <v-row>
        <v-col>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <card-list></card-list>
        </v-col>
        <v-col order="12">
        </v-col>
        <v-col order="1">

        </v-col>
      </v-row>
    </v-container>
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
