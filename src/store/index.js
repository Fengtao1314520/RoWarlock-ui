import Vue from 'vue'
import Vuex from 'vuex'
import testsuite from './Func/testsuite'
import common from './Func/common'
import twoproject from './Func/twoproject'
import releasemanagement from './Func/releasemanagement'
import testrun from './Func/testrun'
import viewproject from './Func/viewproject'
import parafunc from './Func/parafunc'
import webui from './AutoTest/webui'
import webconfig from './AutoTest/webconfig.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    testsuite: testsuite,
    common: common,
    twoproject: twoproject,
    releasemanagement: releasemanagement,
    testrun: testrun,
    viewproject: viewproject,
    parafunc: parafunc,
    webui: webui,
    webconfig: webconfig
  }
  // strict: true
})
