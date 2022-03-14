<template>
  <v-app>
    <left-navigation />
    <top-app>
    </top-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <bottom-footer>
    </bottom-footer>
  </v-app>
</template>

<script>

import LeftNavigation from '../../components/Layout/LeftNavigation'
import BottomFooter from '../../components/Layout/BottomFooter'
import TopApp from '../../components/Layout/TopApp'

export default {
  /**
   * 页面框体，透过框体展示程序
   */
  name: 'Layout',
  components: {
    TopApp,
    BottomFooter,
    LeftNavigation
  }

}
</script>

<style scoped>

</style>
