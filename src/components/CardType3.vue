<template>
  <v-container>
    <v-row justify="space-around">
      <!-- 画像に要素をオーバーレイするには v-cardを利用する -->
      <v-card
        min-width="300"
        max-width="400"
        >
        <!-- 親要素であるv-imgタグの中にオーバーレイする要素を入れる -->
        <v-img
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              Messages
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              >
            </v-avatar>
            <p class="ml-3">
              John Doe
            </p>
          </v-card-title>
          <v-card-actions>
            <v-col class="text-right">
              <v-btn
                v-ripple="false"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-img>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'card-type3',
  data () {
    return {
    }
  },
  props: {
  },
  watch: {
    counter: function () {

    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
