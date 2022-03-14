<template>
  <section>
    <b-table :data="data" :narrowed="true" :striped="true">
      <b-table-column v-slot="props" field="id" label="ID" width="40" numeric>
        {{ props.row.id }}
      </b-table-column>
      <b-table-column v-slot="props" field="name" width="250" label="组件名称">
        <p class="has-text-weight-bold is-italic">{{ props.row.name }}</p>
      </b-table-column>
      <b-table-column v-slot="props" field="version" width="100" label="版本号">
        <b-button type="is-cred-2" size="is-small" expanded>
          <p class="is-italic is-size-6">
            {{ props.row.version }}
          </p>
        </b-button>
      </b-table-column>
      <b-table-column v-slot="props" field="url" width="500" label="官方网址">
        <a>{{ props.row.url }}</a>
      </b-table-column>
      <b-table-column v-slot="props" field="license" label="协议类型">
        <b-tag type="is-cgreen-2">{{ props.row.license }}</b-tag>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      data: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.data = [
        {
          id: 1,
          name: '@chakra-ui/vue',
          version: '0.8.0',
          url: 'https://github.com/chakra-ui/chakra-ui-vue',
          license: 'MIT License',
          type: ''
        },
        {
          id: 2,
          name: '@hipsjs/flowy-vue',
          version: '1.0.13',
          url: 'https://github.com/remcoplasmeyer/flowy-vue',
          license: 'MIT License',
          type: ''
        },
        {
          id: 3,
          name: 'vue-apexcharts',
          version: '1.6.0',
          url: 'https://github.com/apexcharts/vue-apexcharts',
          license: 'MIT License',
          type: ''
        },
        {
          id: 4,
          name: 'axios',
          version: '0.21.1',
          url: 'https://github.com/axios/axios',
          license: 'MIT License',
          type: ''
        },
        {
          id: 5,
          name: 'buefy',
          version: '0.9.4',
          url: 'https://github.com/buefy/buefy',
          license: 'MIT License',
          type: ''
        },
        {
          id: 6,
          name: 'bulma',
          version: '0.9.1',
          url: 'https://github.com/jgthms/bulma',
          license: 'MIT License',
          type: ''
        },
        {
          id: 7,
          name: 'html-to-image',
          version: '1.3.25',
          url: 'https://github.com/bubkoo/html-to-image',
          license: 'MIT License',
          type: ''
        },
        {
          id: 8,
          name: 'monaco-editor',
          version: '0.23.0',
          url: 'https://github.com/Microsoft/monaco-editor',
          license: 'MIT License',
          type: ''
        },
        {
          id: 9,
          name: 'superagent',
          version: '6.1.0',
          url: 'https://github.com/visionmedia/superagent',
          license: 'MIT License',
          type: ''
        },
        {
          id: 10,
          name: 'vue-ellipse-progress',
          version: '1.3.0',
          url: 'https://github.com/setaman/vue-ellipse-progress',
          license: 'MIT License',
          type: ''
        },
        {
          id: 11,
          name: 'vue-json-pretty',
          version: '1.7.1',
          url: 'https://github.com/leezng/vue-json-pretty',
          license: 'MIT License',
          type: ''
        },
        {
          id: 12,
          name: 'vue-pdf',
          version: '4.2.0',
          url: 'https://github.com/FranckFreiburger/vue-pdf',
          license: 'MIT License',
          type: ''
        },
        {
          id: 13,
          name: 'vuedraggable',
          version: '2.24.3',
          url: 'https://github.com/SortableJS/Vue.Draggable',
          license: 'MIT License',
          type: ''
        },
        {
          id: 14,
          name: 'vue',
          version: '2.6.11',
          url: 'https://github.com/vuejs/vue',
          license: 'MIT License',
          type: ''
        }
      ]
    }
  }
}
</script>
