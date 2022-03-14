<template>
  <div>
    <title-bar :title-stack="titleStack()" />
    <section class="section is-main-section">
      <view-project :projectname="projectname" :projectindex="1" />
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import ViewProject from '@/components/Article/ViewProject'

export default {
  name: 'SecondProject',
  components: {
    TitleBar,

    ViewProject
  },
  data() {
    return {
      /**
       * 默认展示项目
       */
      defalutprojs: [],
      /**
       * 默认项目名称
       */
      defaultname: '',
      /**
       * 实际项目名称
       */
      projectname: ''
    }
  },
  computed: {
    listData() {
      return this.$store.state.twoproject.defaulttwoprojs
    }
  },
  watch: {
    listData(newVal) {
      // 数据变化后，调用b组件内的函数
      this.defalutprojs = newVal
      this.titleStack()
    }
  },
  mounted() {
    this.defalutprojs = this.$store.state.twoproject.defaulttwoprojs
    this.titleStack()
  },

  methods: {
    /**
     * 返回array
     * title使用
     */
    titleStack() {
      if (this.defalutprojs.length === 0) {
        this.defaultname = '预展示第二个项目'
        this.projectname = null
      } else {
        this.defaultname = this.defalutprojs[1].name
        this.projectname = this.defalutprojs[1].to
      }
      return ['RoWalock', this.defaultname]
    }
  }
}
</script>

<style scoped>
.margin-bottom-075 >>> nav {
  margin-bottom: 0.75rem;
}
</style>
