<template>
  <v-card
    :loading="loading"
    :width="300"
    :min-height="200"
  >
    <v-img
      height="100"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row
        align="center"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{ text }}
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import Konva from 'konva'

export default {
  name: 'card-type2',
  // 自作コンポーネントを利用可能にする
  components: {
  },

  data: function () {
    return {
      loading: false,
      selection: 1
    }
  },
  props: {
    title: {
      type: String
    },
    text: {
      type: String
    }
  },
  watch: {
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    reserve: function () {

    }
  }
}
</script>
