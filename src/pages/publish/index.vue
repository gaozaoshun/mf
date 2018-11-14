<template>
  <div class='wrapper'>
    <div v-show="!showNext">
      <base-activity  @nextStep='nextStep'></base-activity>
    </div>
    <div v-show='showNext'>
      <more-activity @lastStep='lastStep'></more-activity>
    </div>
  
  </div>
</template>

<script>
import BaseActivity from './base-activity'
import MoreActivity from './more-activity'

export default {
  data() {
    return {
      showNext: false,
    }
  },
  components: {
    BaseActivity,
    MoreActivity
  },
  methods: {
    nextStep(activity) {
      this.showNext = true
      this.$store.dispatch('setPublishActivity', activity)
    },
    lastStep() {
      this.showNext = false
    }
  }
}
</script>

<style scoped>
</style>
