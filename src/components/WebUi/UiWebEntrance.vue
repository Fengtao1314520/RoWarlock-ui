<template>
  <v-card elevation="0" class="pa-4">
    <v-card-title class=" indigo accent-4 white--text mb-6">
      <v-icon
        large
        color="white"
        class="mr-4"
      >mdi-apple-keyboard-command</v-icon
      >
      {{ localnodeitem.name }}
    </v-card-title>
    <v-card-text>
      <div v-for="(child, index) in localnodeitem.children" :key="index">
        <v-alert
          v-if="child.ftype === 'file'"
          dark
          outlined
          color="indigo"
          class="rounded-r-xl"
        >
          <v-row>
            <v-col>
              {{ child.name }}
            </v-col>
            <v-spacer />
          </v-row>
        </v-alert>
        <v-alert
          v-else
          dark
          outlined
          color="purple"
          class="rounded-l-xl"
        >
          <v-row>
            <v-icon color="purple" class="ml-2 mt-n1">mdi-folder-marker-outline</v-icon>
            <v-col>
              {{ child.name }}
            </v-col>
            <v-spacer />
          </v-row>
        </v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
// NOTICE: 船新的 uiweb entrance
export default {
  name: 'UiWebEntrance',
  props: {
    nodeitem: Object
  },
  data() {
    return {
      localnodeitem: {}
    }
  },
  watch: {
    nodeitem: {
      immediate: true,
      handler(val) {
        this.localnodeitem = val
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
