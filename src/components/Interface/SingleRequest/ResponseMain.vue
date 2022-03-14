<template>
  <v-card outlined>
    <v-card-title>
      <p class="text-h4 font-weight-black grey--text">Response</p>
      <v-chip :color="returnResultColor" dark label class="mb-4 ml-6 text-h6 font-weight-black">
        {{ localres.statuscode }}
      </v-chip>
      <v-spacer></v-spacer>
      <div>
        <p class="text-caption indigo--text font-italic">耗时: {{ localres.usetime }} ms</p>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-card outlined shaped>
            <v-card-title>Response Header</v-card-title>
            <v-card-text>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        参名
                      </th>
                      <th class="text-left">
                        参值
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in returnResponseHeaderData" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card outlined rounded="tr-xl bl-xl">
            <v-card-title>Complete Request Header</v-card-title>
            <v-card-text>
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        参名
                      </th>
                      <th class="text-left">
                        参值
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in returnCompleteResquestHeaderData" :key="index">
                      <td>{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card color="mt-4" outlined>
        <v-card-title>
          Response body
          <v-chip color="primary" dark label outlined class=" ml-6  font-weight-black">
            JSON
          </v-chip>
        </v-card-title>
        <v-card-text>
          <div v-if="returnJsonBody !== null">
            <vue-json-pretty :data="returnJsonBody" :deep="2" :virtual="false" />
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
/**
 * NOTICE:最后还是要修改颜色的
 */

export default {
  name: 'ResponseMain',
  components: {
    VueJsonPretty
  },
  props: {
    res: Object
  },
  data() {
    return {
      /**
       * 本地res信息对象
       */
      localres: {}
    }
  },
  computed: {
    /**
     * 按照status返回颜色
     */
    returnResultColor() {
      if (this.localres.statuscode === 200) {
        return 'green accent-4'
      } else if (this.localres.statuscode === undefined) {
        return 'grey'
      } else {
        return 'red accent-3'
      }
    },
    /**
     *基于localres.headers组装list
     */
    returnResponseHeaderData() {
      const data = []
      for (const key in this.localres.headers) {
        data.push({
          name: key,
          value: this.localres.headers[key]
        })
      }
      return data
    },
    /**
     *基于localres.reqheaders组装list
     */
    returnCompleteResquestHeaderData() {
      const data = []
      for (const key in this.localres.reqheaders) {
        data.push({
          name: key,
          value: this.localres.reqheaders[key]
        })
      }
      data.push({
        name: 'RequestOriginUri',
        value: this.localres.requestoriginuri
      })
      data.push({
        name: 'Authority',
        value: this.localres.authority
      })
      return data
    },
    /**
     * 返回JSON格式的body
     */
    returnJsonBody() {
      if (this.localres.body !== undefined) {
        if (this.localres.body.substr(0, 1) === '{') {
          // JSON格式
          const result = JSON.parse(this.localres.body)
          return result
        } else {
          return null
        }
      } else {
        return null
      }
    }
  },

  watch: {
    res: {
      immediate: true,
      handler(val) {
        this.localres = val
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.padding-0 {
  padding: 0rem;
}

.padding-x {
  padding: 0.25rem 1rem 0.25rem 1.5rem;
}

.margin-0 {
  margin: 0rem;
}

.columns:last-child {
  margin: 0rem;
}

.columns {
  margin: 0rem;
}

.column {
  padding: 0rem;
}
</style>
