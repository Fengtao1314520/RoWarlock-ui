<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <!-- 上方 -->
    <welcome-tile />
  </div>
</template>

<script>

import TitleBar from '../components/TitleBar'
import WelcomeTile from '../components/Tile/WelcomeTile'

export default {
  /**
   * 主页 dashboard
   */
  name: 'Home',
  components: {
    TitleBar,
    WelcomeTile
  },
  data() {
    return {}
  },
  computed: {
    titleStack() {
      return ['RoWalock', '仪表盘']
    }
  },
  mounted() {
    this.$buefy.snackbar.open({
      message: '欢迎回来',
      queue: false
    })
  },

  methods: {}
}
</script>

<style scoped></style>
