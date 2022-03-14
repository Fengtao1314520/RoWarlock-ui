<template>
  <v-navigation-drawer permanent floating app>
    <v-alert
      dense
      shaped
      color="indigo accent-2">
      <p class="text-h4 mb-0 mt-2 pl-4 font-weight-black font-italic white--text">Rowarlock</p>
    </v-alert>
    <v-list
      dense
      nav
      shaped
    >
      <v-list-item-group
        v-model="selectmenu"
      >
        <v-list-item
          v-for="item in sidemenu"
          :key="item.to"
          link
          dense
          active-class="select-active"
          :to="item.to"
        >
          <v-list-item-icon class="mr-3">
            <v-icon color="deep-purple">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <p class="text-subtitle-2 ma-0">{{ item.label }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="item in moremenu"
          :key="item.to"
          link
          dense
          active-class="select-active"
          :to="item.to"
        >
          <v-list-item-icon class="mr-3">
            <v-icon color="deep-purple">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <p class="text-subtitle-2 ma-0">{{ item.label }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
/**
 * 左侧菜单栏目
 * */
export default {
  name: 'LeftNavigation',
  data() {
    return {
      selectmenu: null,
      /**
       * 边界菜单 1
       */
      sidemenu: [
        {
          to: '/dashboard',
          icon: 'mdi-desktop-mac',
          label: 'Dashboard',
          type: 'dashboard'
        },
        /*
        {
          to: '/project/webui',
          icon: 'mdi-laptop',
          label: 'Web UI Test',
          type: 'project'
        },
        */

        {
          to: '/project/webui',
          icon: 'mdi-laptop',
          label: 'Web UI Test',
          type: 'project'
        },
        {
          to: '/project/second',
          icon: 'mdi-arch',
          label: 'PCSOFT2',
          type: 'project'
        },
        {
          to: '/release/releasemanagement',
          icon: 'mdi-reload',
          label: '释放管理',
          type: 'release'
        },
        {
          to: '/profile/settings',
          icon: 'mdi-cog-transfer-outline',
          label: '个人设置',
          type: 'profile'
        },
        {
          to: '/craft/interface',
          icon: 'mdi-expansion-card',
          label: '接口测试(web)',
          type: 'craft'
        },
        {
          to: '/craft/interfacerun',
          icon: 'mdi-run',
          label: '接口测试(web)执行',
          type: 'craft'
        }

      ],
      /**
       * 边界菜单 2
       */
      moremenu: [
        {
          to: '/docs/course',
          label: '教程',
          icon: 'mdi-chess-bishop',
          type: 'more'
        },
        {
          to: '/docs/apis',
          label: 'APIs',
          icon: 'mdi-api',
          type: 'more'
        },
        {
          to: '/docs/about',
          label: '关于',
          icon: 'mdi-information-outline',
          type: 'more'
        }
      ]
    }
  },
  computed: {
    listData() {
      return this.$store.state.twoproject.defaulttwoprojs
    }

  },
  watch: {
    listData(newVal) {
      this.changeProjectView(newVal)
    }
  },
  methods: {
  /**
   * 初始化
   * @param project 选择的项目
   */
    changeProjectView(project) {
      // this.sidemenu[1].to = project[0].to
      this.sidemenu[1].label = project[0].name
      // this.sidemenu[2].to = project[1].to
      this.sidemenu[2].label = project[1].name
    }
  }
}
</script>

<style scoped lang="scss">
.select-active {
  background: linear-gradient(98deg, #536DFE, #304FFE);
  color : white !important;
}
</style>
