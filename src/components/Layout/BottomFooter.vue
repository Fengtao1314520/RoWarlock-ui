<template>
  <v-footer
    app
    inset
    fixed
    padless
    height="42"
  >
    <v-row>
      <v-col cols="5">
        <v-chip
          class="ma-1"
          color="deep-purple accent-4"
          outlined
          label
        >
          <v-icon left>
            mdi-check-decagram
          </v-icon>
          v0.1.3
        </v-chip>
        <b>&copy; {{ year }}-{{ year + 1 }} &mdash; RoWarlock</b>
      </v-col>
      <v-spacer />
      <v-col>
        <b>Create By Nate Feng</b>
        <v-chip
          class="ma-2"
          color="primary"
          label
          small
        >
          Vue.js
        </v-chip>
        <v-chip
          class="ma-2"
          color="primary"
          label
          small
        >
          Vuetify
        </v-chip>
        <v-chip
          class="ma-2"
          color="primary"
          label
          small
        >
          AntV
        </v-chip>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
/**
 * 主框架底部
 * 显示名称、作者、使用的主、组件、CSS框架等
 */
export default {
  name: 'BottomFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>

</style>
