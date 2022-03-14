<template>
 <v-app>
   <v-card>
     <title-bar :title-stack="titleStack" />
     <!-- 上方 -->
     <release-entrance />
   </v-card>
 </v-app>
</template>

<script>
import TitleBar from '../../components/TitleBar.vue'
import ReleaseEntrance from '../../components/ReleaseManagement/ReleaseEntrance'

export default {
  /**
   * 主页 释放管理
   */
  name: 'ReleaseManagement',
  components: {
    ReleaseEntrance,
    TitleBar
  },
  data() {
    return {}
  },
  computed: {
    titleStack() {
      return ['RoWalock', '释放管理']
    }
  },

  methods: {}
}
</script>

<style scoped></style>
