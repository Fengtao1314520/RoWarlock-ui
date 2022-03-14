<template>
  <div class="notification is-cyellow-2">
    <div v-if="localitem !== undefined || localitem !== ''">
      <vue-json-pretty :data="localitem" :deep="2" :virtual="false" />
    </div>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
export default {
  name: 'ViewJson',
  components: {
    VueJsonPretty
  },
  props: {
    item: Object
  },
  data() {
    return {
      localitem: {}
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        this.localitem = val
      },
      deep: true
    }
  },

  methods: {}
}
</script>

<style></style>
