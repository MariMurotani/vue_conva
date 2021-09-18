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
            <v-icon>{{ dashboard }}</v-icon>
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

      <v-list-item href="https://fonts.google.com/icons" target="_blank">
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            マテリアルアイコン
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mdiAccount, mdiCheck, mdiViewDashboard, mdiImageAlbum, mdiInformation, mdiHelpCircleOutline, mdiLink } from '@mdi/js'

export default {
  name: 'left-menu',
  // 自作コンポーネントを利用可能にする
  components: {
  },
  data: function () {
    return {
      account: mdiAccount,
      check: mdiCheck,
      dashboard: mdiViewDashboard,
      link: mdiLink,
      items: [
        {
          title: 'VueConv',
          icon: mdiImageAlbum,
          link: '/vueconv'
        },
        {
          title: 'Vuetify',
          icon: mdiInformation,
          link: '/vuetify'
        },
        {
          title: 'Other',
          icon: mdiHelpCircleOutline,
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
  computed () {
  },
  methods: {
  }
}
</script>
