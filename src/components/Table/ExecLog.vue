<template>
  <div>
    <b-carousel :indicator="false">
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <section>
          <article v-for="(item, index) in carousel" :key="index" class="media">
            <figure class="media-left">
              <b-icon icon="view-dashboard" size="is-medium" type="is-success" />
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <b-tag type="is-cred-1" class="mr-2">
                    <b>{{ item.taskstatus }}</b>
                  </b-tag>
                  <b-tag type="is-success is-light" class="mr-2">
                    <b>{{ item.exectype }}</b>
                  </b-tag>
                  <small>{{ item.extrainfo }}</small>
                  <br />
                  <span class="mr-2">{{ item.execdata }}</span>
                </p>
              </div>
            </div>
          </article>
        </section>
      </b-carousel-item>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'ExecLog',
  props: {
    /**
     * 最新的log
     * 前6条
     */
    carousels: Array
  },
  data() {
    return {}
  }
}
</script>

<style></style>
