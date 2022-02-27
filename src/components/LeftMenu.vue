<template>
  <v-card
    height="400"
    width="256"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list-item href="">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-icon>mdi-dashboard</v-icon>
            <router-link to="/conv">TOP</router-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            Vue + ConvJS + Vuetify
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item href="https://fonts.google.com/icons" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-launch</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>マテリアルアイコン</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </v-card>
</template>

<script>

export default {
  name: 'left-menu',
  // 自作コンポーネントを利用可能にする
  components: {
  },
  data: function () {
    return {
      items: [
        {
          title: 'VueConva',
          icon: 'mdi-image-album',
          link: '/vueconva'
        },
        {
          title: 'Vuetify',
          icon: 'mdi-information',
          link: '/vuetify'
        },
        {
          title: 'LayoutVuetify',
          icon: 'mdi-information',
          link: '/layout_vuetify'
        },
        {
          title: 'Sender',
          icon: 'mdi-access-point-check',
          link: '/sender'
        },
        {
          title: 'Receiver',
          icon: 'mdi-access-point',
          link: '/receiver'
        },
        {
          title: 'Other',
          icon: 'mdi-help-circle-outline',
          link: '/other'
        }
      ]
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
  }
}
</script>
