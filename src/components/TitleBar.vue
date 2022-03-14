<template>
  <section class="section is-title-bar">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <ul>
            <li v-for="(title, index) in titleStack" :key="index">{{ title }}</li>
          </ul>
        </div>
      </div>
      <div class="level-right" />
    </div>
  </section>
</template>

<script>
export default {
  /**
   * 主界面的title控件，显示根级菜单
   */
  name: 'TitleBar',
  props: {
    titleStack: {
      type: Array,
      default: () => []
    }
  }
}
</script>
