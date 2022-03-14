<template>
  <div class="has-background-cwhite-1">
    <div class="tile is-vertical">
      <!--顶部上层展示项目的数据内容-->
      <div class="tile">
        <div class="tile is-parent is-2">
          <article class="tile is-child notification padding-0">
            <p class="title">绑定</p>
            <div class="content">
              <!-- Content -->
              <hr class="margin-05" />
              <mapping-project :projectname="projectinfo.name" :projectindex="projectinfo.index"></mapping-project>
            </div>
          </article>
        </div>
        <div class="tile is-parent is-vertical is-3">
          <article class="tile is-child notification padding-0">
            <card-component class="tile is-child" icon="chart-arc">
              <div>
                <div class="level">
                  <div class="level-item">
                    <!-- Content -->
                    <div class="tile is-child notification is-cgreen-4 padding-0">
                      <h1 class="title is-2 has-text-centered">
                        <b>{{ basicinfo.completed }}</b>
                      </h1>
                      <p class=" has-text-centered ">
                        {{ TASKSTATUS_CN.COMPLETED }}
                      </p>
                    </div>
                  </div>
                  <div class="level-item">
                    <!-- Content -->
                    <div class="tile is-child notification is-cyellow-1 padding-0">
                      <h1 class="title is-2 has-text-centered">
                        <b>{{ basicinfo.exec }}</b>
                      </h1>
                      <p class=" has-text-centered ">
                        {{ TASKSTATUS_CN.EXEC }}
                      </p>
                    </div>
                  </div>
                </div>
                <hr class="margin-02 has-background-cblue-2" />
                <div>
                  <div class="level">
                    <div class="box level-item">
                      <p class="has-text-left mt-3">{{ TASKSTATUS_CN.TOTAL }}</p>
                      <p class="subtitle is-3 is-italic ml-3 has-text-cgreen-4">
                        {{ basicinfo.total }}
                      </p>
                    </div>
                    <div class="box level-item">
                      <p class="has-text-left mt-3">{{ TASKSTATUS_CN.COVER }}</p>
                      <p class="subtitle is-3 is-italic ml-3 has-text-cblue-4">{{ basicinfo.cover }} %</p>
                    </div>
                  </div>
                  <div class="level">
                    <div class="box level-item">
                      <p class="has-text-left mt-3">{{ TASKSTATUS_CN.HOLD }}</p>
                      <p class="subtitle is-3 is-italic ml-3 has-text-cgray-1">
                        {{ basicinfo.hold }}
                      </p>
                    </div>
                    <div class="box level-item">
                      <p class="has-text-left mt-3">{{ TASKSTATUS_CN.BLOCK }}</p>
                      <p class="subtitle is-3 is-italic ml-3  has-text-cred-2">
                        {{ basicinfo.block }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </card-component>
          </article>
          <article class="tile is-child notification padding-0" :style="zoom">
            <b-carousel
              class="tile is-child"
              :autoplay="true"
              :interval="1500"
              :arrow="false"
              :indicator="false"
              :pause-info="false"
            >
              <b-carousel-item v-for="(item, i) in carousels[0]" :key="i">
                <section class="hero">
                  <div class="hero-body">
                    <div>
                      <card-widget
                        leftorright="left"
                        class="tile is-child"
                        type="is-success"
                        icon="chart-timeline-variant"
                        :message="item"
                      ></card-widget>
                    </div>
                  </div>
                </section>
              </b-carousel-item>
            </b-carousel>
          </article>
          <article class="tile is-child notification padding-0" :style="zoom">
            <apexchart ref="treemapchart" height="150" :options="treemapchart.Options" :series="treemapchart.series" />
          </article>
          <article class="tile is-child notification padding-0" :style="zoom">
            <b-carousel
              class="tile is-child"
              :autoplay="true"
              :interval="1500"
              :arrow="false"
              :indicator="false"
              :pause-info="false"
            >
              <b-carousel-item v-for="(item, i) in carousels[1]" :key="i">
                <section class="hero">
                  <div class="hero-body">
                    <div>
                      <card-widget
                        class="tile is-child"
                        type="is-success"
                        icon="chart-timeline-variant"
                        :message="item"
                        leftorright="right"
                      ></card-widget>
                    </div>
                  </div>
                </section>
              </b-carousel-item>
            </b-carousel>
          </article>
        </div>
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification padding-0">
              <apexchart :options="linechart.Options" :series="linechart.series" />
            </article>
            <article class="tile is-child notification padding-0">
              <apexchart :options="columnchart.Options" :series="columnchart.series" />
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification padding-0">
              <apexchart ref="timechartA" :options="timechartA.Options" :series="timechartA.series" />
            </article>
            <article class="tile is-child notification padding-0">
              <apexchart ref="timechartB" :options="timechartB.Options" :series="timechartB.series" />
            </article>
          </div>
        </div>
      </div>
      <!--顶部上层展示项目的数据内容-->
      <div class="tile is-parent">
        <article class="tile is-child notification padding-0">
          <personal-task-table
            class="padding-1"
            :alldata="activetabtasklist"
            :showtaskid="true"
            :allowsearch="true"
            :width="180"
          />
        </article>
        <article class="tile is-child ification padding-0 is-4"></article>
      </div>
    </div>
  </div>
</template>

<script>
import MappingProject from '@/components/Article/MappingProject'
import CardComponent from '@/components/Card/CardComponent'
import CardWidget from '@/components/Card/CardWidget'
import PersonalTaskTable from '@/components/Table/PersonalTaskTable'
import {
  getCarousels,
  getMappingTaskByProjectName,
  getPorjectStatusByDate,
  getProjectBasicInfo,
  getProjectStatusByTimeA,
  getProjectStatusByTimeB,
  getTotalTaskByProject,
  getProjectCover
} from '@/scripts/viewproject'
import { TASKSTATUS_CN, TASKSTATUS_EN } from '../../scripts/internal'
export default {
  name: 'ViewProject',
  components: {
    CardComponent,
    CardWidget,
    PersonalTaskTable,
    MappingProject
  },
  props: {
    /**
     * 项目名称
     */
    projectname: String,
    /**
     * 项目排序
     */
    projectindex: Number
  },

  data() {
    return {
      /**
       * 缩放大小
       */
      zoom: 'zoom:65%',

      /**
       * 本地
       * 缩放状态
       */
      TASKSTATUS_CN: TASKSTATUS_CN,

      /**
       * 项目信息
       */
      projectinfo: {
        name: '',
        index: -1
      },

      /**
       * 项目基本信息
       */
      basicinfo: {},

      /**
       * 轮播消息
       * NOTICE: 这边暂时借用一下执行日志的操作
       * NOTICE: 轮播消息应该是轮播的本项目内的单个任务(TASK)
       * NOTEICE: 存有两个轮播信息，应该是2个list在一个carousels内
       */
      carousels: [],

      /**
       * 展示NEW/COMPLETED数据
       */
      linechart: {
        series: [],
        Options: {
          chart: {
            height: 80,
            width: 100,
            type: 'line',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'number'
          }
        }
      },

      /**
       * 展示EXEC/HOLD/BLOCK数据
       */
      columnchart: {
        series: [],
        Options: {
          chart: {
            type: 'bar',
            height: 80,
            width: 100,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['一', '二', '三', '四', '五', '六', '七']
          },
          yaxis: {
            title: {
              text: '不同任务类型个数'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return val + '个(task)'
              }
            }
          }
        }
      },

      /**
       * 依赖时间,展示记录
       */
      timechartA: {
        series: [
          {
            name: '提交记录',
            data: []
          }
        ],
        Options: {
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false
            }
          },
          colors: ['#FFE194'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: []
          },
          yaxis: {
            title: {
              text: '24小时更新分布'
            }
          },
          tooltip: {
            x: {
              format: 'yyyy-MM-dd HH:mm:ss.fff'
            }
          }
        }
      },

      /**
       * 依赖时间,展示记录
       */
      timechartB: {
        series: [
          {
            name: '提交记录',
            data: []
          }
        ],
        Options: {
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: false
            }
          },
          colors: ['#FF616D'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: []
          },
          yaxis: {
            title: {
              text: '24小时创建分布'
            }
          },
          tooltip: {
            x: {
              format: 'yyyy-MM-dd HH:mm:ss.fff'
            }
          }
        }
      },

      /**
       * TreeMap 表
       */
      treemapchart: {
        series: [
          {
            data: []
          }
        ],
        Options: {
          legend: {
            show: false
          },
          chart: {
            height: 150,
            type: 'treemap',
            toolbar: {
              show: false
            }
          },
          title: {
            text: '项目占比'
          },

          plotOptions: {
            treemap: {
              enableShades: true,
              shadeIntensity: 0.5,
              reverseNegativeShade: true,
              colorScale: {
                ranges: [
                  {
                    from: 0,
                    to: 20,
                    color: '#FFC947'
                  },
                  {
                    from: 20.0001,
                    to: 40,
                    color: '#1EAE98'
                  },
                  {
                    from: 40.0001,
                    to: 60,
                    color: '#F55C47'
                  },
                  {
                    from: 60.0001,
                    to: 80,
                    color: '#444444'
                  },
                  {
                    from: 80.0001,
                    to: 200,
                    color: '#2940D3'
                  }
                ]
              }
            }
          }
        }
      },

      /**
       * 活动的tab内容
       */
      activetabtasklist: [],

      /**
       *所有数据
       */
      totaltasklist: []
    }
  },

  computed: {
    datainit() {
      return {
        name: this.projectname,
        index: this.projectindex
      }
    }
  },

  watch: {
    /**
     * 监听 数据初始化
     */
    datainit: {
      immediate: false,
      handler(val) {
        this.projectinfo = val
        this.init(val)
      },
      deep: true
    }
  },

  mounted() {},

  methods: {
    /**
     * 初始化
     * 初始化绑定数据的一栏
     */
    init(projectinfo) {
      // 获取已经映射的数据
      getMappingTaskByProjectName(projectinfo.name)
        .then(result => {
          // 创建数据
          const data = {
            tasklist: result,
            projectname: projectinfo.name,
            worktable: 'DEFALT(默认)',
            projectindex: projectinfo.index
          }
          this.$store.commit('initViewProject', data) // 提交更新VUEX
        })
        .catch(() => {})
        .finally(() => {
          this.basicinfo = getProjectBasicInfo(projectinfo) // 展示已映射的任务，各个任务类型数量
          this.carousels = getCarousels(projectinfo) // 轮播消息
          this.totaltasklist = getTotalTaskByProject(projectinfo) // 下部展示任务的table list
          this.changeTab(TASKSTATUS_EN.EXEC) // 下部展示任务 只展示正在执行的数据
          this.seriesFunc(projectinfo) // 绘图
        })
    },

    /**
     * 处理图表数据
     * NOTICE: 1.新建和完成写入line表
     * NOTICE: 2.其他的写入radio表
     */
    seriesFunc(projectinfo) {
      const tempdate = getPorjectStatusByDate(projectinfo) // 任务类型的前7天计数汇总
      const temptimeA = getProjectStatusByTimeA(projectinfo) // 按照time进行24小时内更新分布
      const temptimeB = getProjectStatusByTimeB(projectinfo) // 按照time进行24小时内创建分布
      const temptreemapdata = getProjectCover(projectinfo)
      // console.log(temptreemapdata.data)

      // this.linechart.series = [] // 初始化
      // this.columnchart.series = [] // 初始化
      // this.treemapchart.series = []// 初始化

      // 赋值
      this.timechartA.series[0].data = temptimeA.data
      this.timechartA.Options.xaxis.categories = temptimeA.categories
      this.timechartB.series[0].data = temptimeB.data
      this.timechartB.Options.xaxis.categories = temptimeB.categories
      // console.log(this.treemapchart.series)
      this.treemapchart.series[0].data = temptreemapdata.data

      // 更新数据
      // NOTICE: apexchart是需要使用方法更新数据和配置，直接修改data内值没有用
      this.$refs.timechartA.updateSeries([
        {
          data: this.timechartA.series[0].data
        }
      ])
      this.$refs.timechartA.updateOptions({
        xaxis: {
          categories: this.timechartA.Options.xaxis.categories
        }
      })

      // 更新数据
      // NOTICE: apexchart是需要使用方法更新数据和配置，直接修改data内值没有用
      this.$refs.timechartB.updateSeries([
        {
          data: this.timechartB.series[0].data
        }
      ])
      this.$refs.timechartB.updateOptions({
        xaxis: {
          categories: this.timechartB.Options.xaxis.categories
        }
      })

      // 更新数据
      // NOTICE: apexchart是需要使用方法更新数据和配置，直接修改data内值没有用
      /*
      this.$refs.treemapchart.updateSeries([
        {
          data: this.treemapchart.series[0].data
        }
      ])
      */

      // 处理数据(NOTICE: 看着眼睛疼太复杂了)
      tempdate.forEach(element => {
        if (element.type === 'new' || element.type === 'completed') {
          const temparray = [] // 获取data数据
          element.values.forEach(value => {
            temparray.push(value.value)
          })
          const template = {
            name: element.type,
            data: temparray
          } // 赋值，拼接
          this.linechart.series.push(template) // 送入正主
        } else if (element.type === 'exec' || element.type === 'hold' || element.type === 'block') {
          const temparray = [] // 获取data数据
          element.values.forEach(value => {
            temparray.push(value.value)
          })
          const template = {
            name: element.type,
            data: temparray
          } // 赋值，拼接
          this.columnchart.series.push(template) // 送入正主
        }
      })
    },

    /**
     * 改变tab sheet
     */
    changeTab(value) {
      // 设置活动的任务tab的为空
      this.activetabtasklist = []
      // 根据状态分拆到各个tab内，当tab进行更改时执行
      if (value === TASKSTATUS_EN.TOTAL) {
        this.activetabtasklist = this.totaltasklist
      } else {
        for (let index = 0; index < this.totaltasklist.length; index++) {
          const element = this.totaltasklist[index]
          if (element.taskstatus.toLowerCase() === value) {
            this.activetabtasklist.push(element)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tile {
  &.is-parent {
    padding: 0rem;
  }
}

.tile {
  &.is-vertical & > .tile.is-child:not(:last-child) {
    margin-bottom: 0.5rem !important;
  }
}

.padding-0 {
  padding: 0rem;
}
.margin-05 {
  margin: 0.5rem;
}
.margin-02 {
  margin: 0.2rem;
}

.hero-body {
  padding: 0rem;
}
.padding-1 {
  padding: 1rem;
}
</style>
