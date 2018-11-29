<template>
  <div class="wrapper">

  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  components: {

  },
  computed: {

  },
  mounted() {
    // 获取活动ID
    let activityId = this.$root.$mp.query
    console.log(activityId)
    this.getActivityList()
  },
  methods:{
    getActivityList(){
      
    }
  }
}
</script>

<style>
</style>
