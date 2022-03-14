<template>
  <div>
    <card-component>
      <div class="level">
        <div class="level-left">
          <b-taglist v-if="leftorright === 'left'">
            <b-tag type="is-cred-2">
              <h3 class="subtitle is-spaced has-text-cwhite-1">
                {{ message.messageorigin }}
              </h3>
            </b-tag>
            <b-tag type="is-cblue-3">
              <h3 class="subtitle is-spaced has-text-cwhite-1">
                {{ message.messagetype }}
              </h3>
            </b-tag>
          </b-taglist>
        </div>
        <div class="level-right">
          <b-taglist v-if="leftorright === 'right'">
            <b-tag type="is-cred-2">
              <h3 class="subtitle is-spaced has-text-cwhite-1">
                {{ message.messageorigin }}
              </h3>
            </b-tag>
            <b-tag type="is-cblue-3">
              <h3 class="subtitle is-spaced has-text-cwhite-1">
                {{ message.messagetype }}
              </h3>
            </b-tag>
          </b-taglist>
        </div>
      </div>

      <div class="level is-mobile">
        <div class="level-item">
          <div class="is-widget-label">
            <div>
              <h1 class="title is-3">
                {{ message.messagetitle }}
              </h1>
              <p class="has-text-cblue-1">
                {{ message.messagecontent }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="icon" class="level-item has-widget-icon">
          <div class="is-widget-icon">
            <b-icon :icon="icon" size="is-large" :type="type" />
          </div>
        </div>
      </div>
    </card-component>
  </div>
</template>

<script>
import CardComponent from '@/components/Card/CardComponent'

export default {
  name: 'CardWidget',
  components: { CardComponent },
  props: {
    icon: {
      type: String,
      default: null
    },
    message: Object,
    number: {
      type: Number,
      default: null
    },

    type: {
      type: String,
      default: null
    },
    leftorright: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style scoped>
.text-wrapper {
  word-break: break-all;
  word-wrap: break-word;
}
</style>
