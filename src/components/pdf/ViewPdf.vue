<template>
  <div>
    <pdf :page="pageNum" :src="src" style="display: inline-block; width: 75%" @num-pages="pageTotalNum = $event" />
    <p>{{ pageNum }} / {{ pageTotalNum }}</p>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
export default {
  name: 'ViewPdf',
  components: {
    pdf
  },
  props: {
    // 外部传递pdfUrl 即可
    pdfurl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      src: '',
      /**
       * 当前页
       */
      pageNum: 1,
      /**
       * 总页
       */
      pageTotalNum: 0
    }
  },
  computed: {},

  watch: {
    pdfurl(val) {
      this.pageNum = 1 // 默认值
      this.src = pdf.createLoadingTask({
        url: val,
        CMapReaderFactory
      })
    }
  },

  methods: {
    /**
     * 更改页面
     */
    changePage(number) {
      const page = this.pageNum + number
      if (page <= 0) {
        this.pageNum = 1
      } else if (page <= this.pageTotalNum) {
        this.pageNum = page
      } else {
        this.pageNum = this.pageTotalNum
      }
    }
  }
}
</script>
