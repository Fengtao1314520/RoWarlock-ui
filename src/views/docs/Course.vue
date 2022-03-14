<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-3">
          <div class="level">
            <a @click="prePage()">
              <b-icon icon="chevron-triple-left" />
            </a>
            <a @click="nextPage()">
              <b-icon icon="chevron-triple-right" />
            </a>
          </div>
          <b-menu>
            <b-menu-list label="测试学习资料">
              <b-menu-item v-for="(item, index) in bookjson" :key="index" icon="book-open">
                <template slot="label" slot-scope="props">
                  {{ item.folder }}
                  <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                </template>
                <b-menu-item
                  v-for="(fitem, findex) in item.file"
                  :key="findex"
                  :label="fitem"
                  @click="openDoc(fitem)"
                />
              </b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
        <div class="column">
          <view-pdf ref="pdf" :pdfurl="activedocurl" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import ViewPdf from '@/components/pdf/ViewPdf'

export default {
  name: 'Course',
  components: {
    TitleBar,
    ViewPdf
  },
  data() {
    return {
      bookjson: [
        {
          folder: '自动化测试概述',
          file: [
            '自动化测试概述(一)',
            '自动化测试概述(二)-自动化测试人员构成',
            '自动化测试概述(三)-进击的测试工程师',
            '自动化测试概述(四)-执行？开发？',
            '自动化测试概述(五)-接口的重要性',
            '自动化测试概述(七)-_奥利奥_架构'
          ]
        },
        {
          folder: '组件化测试用例',
          file: ['component case']
        }
      ],
      activedocurl: ''
    }
  },
  computed: {
    titleStack() {
      return ['RoWalock', '文档与教程']
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    /**
     * 初始化     */
    init() {},

    /**
     * 打开文档
     * @param itemname  文件名
     */
    openDoc(itemname) {
      this.activedocurl = '/documents/' + itemname + '.pdf'
    },
    /**
     * 前一页
     */
    prePage() {
      this.$refs.pdf.changePage(-1) // 调用子组件的方法
    },
    /**
     * 下一页
     */
    nextPage() {
      this.$refs.pdf.changePage(1) // 调用子组件的方法
    }
  }
}
</script>
