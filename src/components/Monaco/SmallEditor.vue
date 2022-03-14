<template>
  <div id="monaco" style="height:300px;" />
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'

export default {
  name: 'SmallEditor',
  data() {
    return {
      editor: null, // 文本编辑器,
      /** 内容 */
      content: ''
    }
  },
  watch: {
    content: {
      immediate: false,
      handler(val) {
        this.updateContent(val)
      }
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.content = ''
      this.editor = monaco.editor.create(document.getElementById('monaco'), {
        value: this.content, // 编辑器初始显示文字
        language: 'javascript', // 语言支持自行查阅demo
        selectOnLineNumbers: true, // 显示行号
        fontSize: 14, // 字体大小,
        readOnly: false, // 是否只读
        autoIndent: true,
        formatOnPaste: true,
        formatOnType: true,
        fontFamily: 'Fira Code Retina',
        automaticLayout: true, // 自动布局
        theme: 'vs-dark', // 主题
        wordWarp: false // 自动换行
      })
    },

    /**
     * 美化代码
     */
    beautfiyCode() {
      this.editor.trigger('anyString', 'editor.action.formatDocument')
    },
    /**
     * 更新显示内容
     */
    updateContent(val) {
      setTimeout(() => {
        this.editor.getModel().setValue(val)
      }, 150)
    },

    getContent() {
      const value = this.editor.getValue()
      return value
    },
    appendContent(content) {
      const line = this.editor.getPosition()
      const range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1)
      const id = { major: 1, minor: 1 }
      const text = content.toString()
      const op = { identifier: id, range: range, text: text, forceMoveMarkers: true }
      this.editor.executeEdits('my-source', [op])
    },

    dispose() {
      if (this.editor) {
        this.editor.getModel().dispose()
        this.editor.dispose()
      }
    }
  }
}
</script>

<style></style>
