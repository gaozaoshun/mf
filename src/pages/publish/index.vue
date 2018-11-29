<template>
  <div class='wrapper'>
    <div v-show="showOne">
      <base-activity @nextStep='toStepTwo'></base-activity>
    </div>
    <div v-show='showTwo'>
      <more-activity @lastStep='toStepOne' @nextStep='toStepThree'></more-activity>
    </div>
    <div v-show='showThree'>
      <last-activity @lastStep='toStepTwo'></last-activity>
    </div>
     <!-- 提示 -->
    <i-toast id="toast" />
    <!-- 全局提醒 -->
    <i-message id="message" />
  </div>
</template>

<script>
import BaseActivity from './base-activity'
import MoreActivity from './more-activity'
import LastActivity from './last-activity'

export default {
  data() {
    return {
      showOne: true,
      showTwo: false,
      showThree: false,
    }
  },
  components: {
    BaseActivity,
    MoreActivity,
    LastActivity
  },
  methods: {
    toStepTwo(activity) {
      this.showTwo = true
      this.showOne = false
      this.showThree = false
      this.$store.dispatch('setPublishActivity', activity)
    },
    toStepOne() {
      this.showTwo = false
      this.showOne = true
      this.showThree = false
    },
    toStepThree(activity) {
      this.showTwo = false
      this.showOne = false
      this.showThree = true
      this.$store.dispatch('setPublishActivity', activity)
    }
  }
}
</script>

<style scoped>
</style>
