<template>
  <v-app-bar app flat outlined>
    <v-toolbar-title></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu rounded offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          color="blue accent-4"
          class="white--text mr-1"
          text
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>{{ personmenu.icon }}</v-icon>
          {{ personmenu.label }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="item in personmenu.menu"
          :key="item.to"
          :to=" item.to"
          dense
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="grey">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <p class="text-subtitle-2 ma-0">{{ item.label }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu rounded offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          color="blue accent-4"
          class="white--text mr-1"
          text
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-menu-open</v-icon>
          MENU
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="item in menu"
          :key="item.to"
          :to=" item.to"
          dense
        >
          <v-list-item-icon class="mr-2">
            <v-icon color="grey">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <p class="text-subtitle-2 ma-0">{{ item.label }}</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      color="indigo accent-2"
      fab
      x-small
      to="/profile/messages"
      class="mr-2"
    >
      <v-icon color="white">mdi-email</v-icon>
    </v-btn>
    <v-btn
      color="indigo accent-2"
      fab
      x-small
      to="/docs/apis"
      class="mr-2"
    >
      <v-icon color="white">mdi-api</v-icon>
    </v-btn>
    <v-btn
      color="indigo accent-2"
      fab
      x-small
      class="mr-2"
      to="/login"
    >
      <v-icon color="white">mdi-location-exit</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopApp',
  data() {
    return {
      personmenu: {
        icon: 'mdi-face-profile',
        label: '',
        menu: [
          {
            to: '/profile/settings',
            icon: 'mdi-settings',
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
        ]
      },

      /**
       * 默认展示项目
       */
      defalutprojs: [],

      /**
       *菜单
       */
      menu: [
        {
          to: '/project/first',
          icon: 'mdi-microsoft',
          label: 'PROJECT 1',
          type: 'project'
        },
        {
          to: '/project/second',
          icon: 'mdi-arch',
          label: 'PROJECT 2',
          type: 'project'
        },
        {
          to: '/release/releasemanagement',
          icon: 'mdi-reload',
          label: '版本管理',
          type: 'release'
        }
      ]

    }
  },
  computed: {
    listData() {
      return this.$store.state.twoproject.defaulttwoprojs
    },
    listUser() {
      return this.$store.state.common.activeusers
    }
  },
  watch: {
    listData(newVal) {
      this.defalutprojs = newVal
      this.init()
    },

    listUser: {
      immediate: true,
      handler(newVal) {
        if (newVal.unickname === '') {
          this.personmenu.label = 'ROWARLOCK'
        } else {
          this.personmenu.label = newVal.unickname
        }
      },
      deep: true
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
      // this.defalutprojs = this.$store.state.twoproject.defaulttwoprojs
      // console.log(this.defalutprojs)
      this.menu[0].label = this.defalutprojs[0].name
      this.menu[1].label = this.defalutprojs[1].name
    }
  }
}
</script>

<style scoped>

</style>
