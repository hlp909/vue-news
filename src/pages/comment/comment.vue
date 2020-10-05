<template>
  <div class="comment-container">
    <!-- 头部组件 -->
    <HeaderNormal title="精彩跟帖" />

    <!-- 评论模块 -->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        >

    <div class="comment" v-for='(item,index) in comment' :key="index" >
      <div class="comment-info">
        <!-- 左侧用户信息 -->
        <div class="comment-user">
          <!-- 头像 -->
          <img :src="$axios.defaults.baseURL+item.user.head_img" v-if="item.user.head_img">
          <img src="../../../static/default_green.jpg" v-else>

          <!-- 用户名字 -->
          <div class="user-info">
            <p>{{item.user.nickname}}</p>
            <span>{{item.create_date}}</span>
          </div>
        </div>

        <span class="reply" @click='handleReply(item)'>回复</span>
      </div>

      <!-- 评论楼层组件 -->
      <CommentFooter v-if="item.parent" :data="item.parent" 
      @handleReply='handleReply'/>

      <div class="comment-content">
        {{item.content}}
      </div>
    </div>

    </van-list>

    <!-- //post文章的详情   replyComment:要回复的评论  getComments：发布评论成功后重新请求评论的列表 -->
    <PostFooter :post='detail' 
    @handleReply='handleReply'
    :replyComment='replyComment'
     @getComments='getComments' />
  </div>
</template>

<script>
import config from './comment'
export default config
</script>

<style scoped lang='less'>
  @import url('./comment.less');
</style>