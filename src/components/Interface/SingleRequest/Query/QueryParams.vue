<template>
  <div>
    <hr class="has-background-cgray-2 margin-05" />
    <div class="level mb-2">
      <div class="level-left">
        <v-btn rounded depressed color="primary" dark x-small class="level-item" @click="addParam()">
          <v-icon left>
            mdi-plus
          </v-icon>
          添加Query参数
        </v-btn>
      </div>
      <div class="level-right" @click="removeAll()">
        <v-btn color="red" class="level-item mr-2" fab x-small dark outlined>
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </div>
    </div>

    <v-card outlined class="mr-2">
      <v-card-text>
        <v-row v-for="(item, index) in localparams" :key="index" dense>
          <v-checkbox v-model="item.select" hide-details dense class="shrink mr-2 mt-2" color="green" />
          <v-col cols="4">
            <v-text-field v-model="item.name" label="参数名" single-line dense clearable />
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="item.value" label="参数值" single-line dense clearable />
          </v-col>
          <v-col cols="2">
            <v-btn icon color="pink" @click="deleteParam(item, index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'QueryParams',
  props: {
    params: Array
  },
  data() {
    return {
      /**
       * 本地的query params
       */
      localparams: []
    }
  },
  watch: {
    params: {
      immediate: true,
      handler(val) {
        this.localparams = val
      }
    },
    localparams: {
      immediate: true,
      handler(val) {
        this.$emit('on-params-change', val) // ③组件内对myResult变更后向外部发送事件通知
      }
    }
  },
  mounted() {
    this.addDefaultParam()
  },
  methods: {
    /**
     * 添加默认参数
     */
    addDefaultParam() {
      if (this.localparams.length === 0) {
        this.addParam()
      }
    },

    /**
     * 添加参数
     */
    addParam() {
      const temp = {
        select: true,
        name: '',
        value: '',
        description: ''
      }
      this.localparams.push(temp)
    },

    /**
     * 移出所有
     */
    removeAll() {
      this.localparams = []
      this.addParam()
    },

    /**
     *删除一个参数
     * @param {*} item 删除对象
     * @param {*} index 删除下标值
     */
    deleteParam(item, index) {
      this.localparams.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.margin-05 {
  margin: 0.5rem;
}

.column-padding {
  padding: 0.75rem 0.25rem 0.25rem 0.25rem;
}
</style>
