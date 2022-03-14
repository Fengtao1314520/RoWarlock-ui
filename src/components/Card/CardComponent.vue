<template>
  <v-card>
    <v-toolbar
      color="white"
      dark
      dense
      flat
    >
      <v-icon color="green accent-4" class="mb-2 mr-3">
        {{ icon }}
      </v-icon>
      <v-toolbar-title class="text-body-2 black--text mb-2">
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>
    <slot />
  </v-card>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    }
  },
  methods: {
    headerIconClick() {
      this.$emit('header-icon-click')
    }
  }
}
</script>

<style scoped>
.padding-05 {
  padding: 0.5rem;
}
</style>
