<template>
  <v-card elevation="0" outlined>
    <v-card shaped>
      <v-tabs
        v-model="tab"
        background-color="blue accent-4"
        dark
        icons-and-text
        right
      >
        <v-tab href="#Entrance">
          入口
          <v-icon>mdi-infinity</v-icon>
        </v-tab>
        <v-tab href="#WebElement">
          ELEMENT元素
          <v-icon>mdi-search-web</v-icon>
        </v-tab>
        <v-tab href="#WebConfig">
          CONFIG配置
          <v-icon>mdi-tune</v-icon>
        </v-tab>
        <v-tab href="#WebScript">
          SCRIPT脚本
          <v-icon>mdi-language-typescript</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="Entrance">
          <ui-web-entrance
            @changeuifile="changeUiFile"
            @changeconfigfile="changeConfigFile"
            @changescriptfile="changeScriptFile"
          />
        </v-tab-item>
        <v-tab-item value="WebElement">
          <ui-web-element :uifile.sync="tempuifile" />
        </v-tab-item>
        <v-tab-item value="WebConfig">
          <ui-web-config :configfile.sync="tempconfigfile" />
        </v-tab-item>
        <v-tab-item value="WebScript">
          <ui-web-script :scriptfile.sync="tempscriptfile" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script>
import UiWebElement from '../../../components/WebUi/Deprecated/UiWebElement'
import UiWebConfig from '../../../components/WebUi/Deprecated/UiWebConfig'
import UiWebScript from '../../../components/WebUi/Deprecated/UiWebScript'
import UiWebEntrance from '../../../components/WebUi/Deprecated/UiWebEntrance'
export default {
  name: 'WebUiProject',
  components: {
    UiWebEntrance,
    UiWebScript,
    UiWebConfig,
    UiWebElement
  },
  data() {
    return {
      tab: null,
      tempuifile: [],
      tempconfigfile: [],
      tempscriptfile: {}
    }
  },

  methods: {
    /**
     * 更改Uifile
     * @param {Array} uifile
     */
    changeUiFile(uifile) {
      /**
       * update 2022-01-10: who care 直接硬怼进tempuifile
       * update 2022-01-21: 被子组件坑了一波，后续传都是用array
       */
      this.tempuifile = uifile
    },
    changeConfigFile(confile) {
      this.tempconfigfile = confile
    },
    changeScriptFile(scriptfile) {
      this.tempscriptfile = scriptfile
    }
  }
}
</script>

<style scoped></style>
