<template>
  <div class='wrapper'>
    <base-activity v-if="!showNext" @nextStep='nextStep'></base-activity>
    <more-activity v-else ></more-activity>
  </div>
</template>

<script>
import BaseActivity from './base-activity'
import MoreActivity from './more-activity'

export default {
  data() {
    return {
      showNext: true
    }
  },
  components: {
    BaseActivity, 
    MoreActivity 
  },
  methods: {
    nextStep(activity) {
      this.showNext = true
      console.log('stepOne', activity)
    }
  }
}
</script>

<style scoped>
</style>
