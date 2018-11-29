<template>
  <div class="wrapper">
    <i-card :title="userInfo.nickName"
            :thumb="userInfo.avatarUrl"
            full="true">
      <div slot="content">
        <i-icon type="flag_fill"
                size="20"
                color="red" />
        <span>个性标签：</span>
        <i-tag class='tag-item'
               v-for="(item,index) in tagList"
               :key="index"
               :name="item.name"
               :color="item.color"
               type="border">
          {{item.name}}
        </i-tag>
      </div>
      <div slot="footer"
           style='color:#ff9900'>
        <i class="iconfont mf-score vertial"></i>
        <span class="vertial"> 信誉：</span>
        <span class="vertial"> 99</span>
      </div>
    </i-card>

    <div class="impress-wrapper marTop">
      <div class="impress">
        <i-icon type="label"
                size="20"
                color="red"></i-icon>
        <span class="vertial"> 聚友对我的印象</span>
      </div>
      <div class="label">
        <i-tag class='tag-item'
               v-for="(item,index) in labelList"
               :key="index"
               :name="item.name"
               :color="item.color">
          {{item.name}}
        </i-tag>
      </div>
    </div>
    <div class="marTop">
      <i-cell-group>
        <i-cell title="活动评价"
                is-link
                url="/pages/evaluate/main"></i-cell>
        <i-cell title="我的消息"
                is-link
                url="/pages/mymsg/main"></i-cell>
      </i-cell-group>
    </div>
    <div class="marTop">
      <i-cell-group>
        <i-cell title="联系客服"
                is-link
                url="/pages/index/main"></i-cell>
      </i-cell-group>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      tagList: [
        { name: '约会', color: 'green' },
        { name: '90后', color: 'red' }
      ],
      labelList: [
        { name: '安静', color: 'green' },
        { name: '吃货', color: 'red' },
        { name: '电影迷', color: 'yellow' }
      ]
    }
  },
  components: {

  },
  computed: {
    userInfo() {
      console.log('userInfo', this.$store.state.userInfo)
      return this.$store.state.userInfo
    }
  },
  created() {
  }
}
</script>

<style>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
}
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.tag-item {
  margin-right: 10rpx;
}
.vertial {
  vertical-align: middle;
}
.impress-wrapper {
  background: #fff;
}
.impress {
  font-size: 25rpx;
  padding: 20rpx;
}
.label {
  padding: 0 20rpx 20rpx 20rpx;
}
.marTop {
  margin-top: 30rpx;
}
</style>
