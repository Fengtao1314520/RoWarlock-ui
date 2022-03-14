<template>
  <v-card>
    <test-suite-detail v-if="changeview===false" :rosobj="selectedros" @openCase="openCase" />
    <test-case-detail v-else :caseobj="slectedcase" @backToCase="backToCase" />
  </v-card>
</template>

<script>
import TestSuiteDetail from './UiWebScript/TestSuiteDetail'
import TestCaseDetail from './UiWebScript/TestCaseDetail'
import { analysisDefaultRos } from '../../scripts/WebUi/WebScript'
import { nowdate } from '../../scripts/common'

export default {
  name: 'UiWebScript',
  components: {
    TestCaseDetail,
    TestSuiteDetail
  },
  props: {
    /**
     * @param {Object} configfile ros文件对象
     */
    scriptfile: Object
  },
  data() {
    return {
      changeview: false,
      /*
      * 选中的的ros(testsuite)
      * NOTICE: REF回传至父节点
      * */
      selectedros: {},
      // 双击被选中的case对象
      slectedcase: {}
    }
  },
  watch: {
    /**
     * 监听 props内的scriptfile参数
     */
    scriptfile: {
      immediate: true,
      handler(val) {
        if (val !== null && val !== undefined && JSON.stringify(val) !== '{}') {
          this.propsReadRosFileFunc(val).then((result) => {
            this.selectedros = result
            this.changeview = false // 重新赋值
          })
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 打开case
     * @param item
     */
    openCase(item) {
      this.slectedcase = item
      this.changeview = true // 重新赋值
    },

    /**
     * 返回suite显示
     * @param localcaseobj
     */
    backToCase(localcaseobj) {
      console.log(localcaseobj)
      console.log(this.selectedros)
      // update: 需要更新对应suite的一个case
      const index = this.selectedros.element.tests.findIndex(item => item.identify === localcaseobj.identify)
      if (index !== -1) {
        this.selectedros.element.tests.splice(index, 1, localcaseobj)
        this.changeview = false // 重新赋值
      }
      // notice:数据就这么直接双向绑定了~ ~
      this.selectedros.annotation.lastupdate.date = nowdate()
    },

    /**
     * 当PROPS内的files发生变化时，被调用
     * @param file 文件
     */
    propsReadRosFileFunc(file) {
      return new Promise(resolve => {
        // doc是string格式的xml,还需要解析处理
        const doc = file.doc
        this.readRosFileFunc(doc, file.name).then(result => {
          resolve(result)
        })
      })
    },

    /**
     * 读取ros文件的func方法
     * @param {any} file ros文件
     * @param {string} name 文件名
     */
    readRosFileFunc(file, name) {
      return new Promise(resolve => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(file, 'application/xml')
        const result = analysisDefaultRos(name, doc) // 解析ros
        resolve(result)
      })
    }
  }
}
</script>
