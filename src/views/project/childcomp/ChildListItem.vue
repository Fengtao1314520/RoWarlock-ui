<template>
  <div>
    <div v-for="(child, index) in childitem.children" :key="index">
      <v-list-group
        v-if="child.ftype ==='folder'"
        link
        dense
        sub-group>
        <template v-slot:activator>
          <v-list-item-icon class="mr-2">
            <v-icon color="purple accent-4">{{ child.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ child.name }}</v-list-item-title>
        </template>
        <child-list-item :childitem="child" v-bind="$attrs" class="ml-2" v-on="$listeners" />
      </v-list-group>
      <v-list-item v-else link dense class="pl-0" @dblclick.native="openFileItem(child)">
        <v-list-item-icon class="mr-2">
          <v-icon color="amber accent-4">{{ child.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ child.name }}</v-list-item-title>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildListItem',
  props: {
    /**
     * 子节点信息对象
     */
    childitem: Object
  },
  methods: {
    openFileItem(childitem) {
      this.$emit('openFileItem', childitem)
    }
  }
}
</script>
