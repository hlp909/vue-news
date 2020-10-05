<template>
  <div>
       <!-- 自己再次在这个位置调用自己 -->
      <comment v-if="data.parent" 
      @handleReply='handleReply'
       :data="data.parent"></comment>

      
      <!-- 评论楼层 -->
      <div class="comment-floor">
          <div class="floor-header">
            <span>1  {{data.user.nickname}}</span>
            <i>2小时前</i>
            <em @click='handleReply'>回复</em>
          </div>

          <div class="comment-content">
              {{data.content}}
          </div>
      </div>

       
  </div>
</template>

<script>
export default {
    //组件的名字。单纯的针对当前的组件命名，当前的组件可以通过该名字自己条用自己
    name:'comment',
    props:['data'],
    
    methods:{
        handleReply(){
            console.log(this.data);
            this.$emit('handleReply',this.data)
        }
    }
}
</script>

<style scoped lang='less'>
 .comment-floor{
        padding: 10px;
        border: 1px solid #ccc;
        background: #f2f2f2;
        .floor-header{
            i{
                font-size: 12px;
                color: #999;
            }
            em{
                float: right;
                font-size: 13px;
                color: #999;
            }
        }
    }
    .comment-content{
        padding: 15px 0 0;
    }

</style>