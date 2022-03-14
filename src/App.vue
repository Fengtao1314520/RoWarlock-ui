<template>
  <component :is="sellayout"></component>
</template>

<script>
const defaultlayout = 'layout'
export default {
  name: 'App',
  computed: {
    sellayout() {
      if (this.$route.meta.layout) {
        return 'blank'
      } else {
        return defaultlayout
      }
    }
  }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&display=swap');
#app{
  font-family: 'Roboto','Noto Sans SC', sans-serif;
}
</style>
