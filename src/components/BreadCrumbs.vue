<template>
  <v-layout>
    <v-breadcrumbs
      :items="items"
      divider=" > "
    ></v-breadcrumbs>
  </v-layout>
</template>

<script>

export default {
  name: 'bread-crumbs',
  // 自作コンポーネントを利用可能にする
  components: {
  },
  data: function () {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
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
