<template>
  <div class="container">

    <!-- 文章详情页的内容 -->
      <div class="article" v-if="detail.type===1">

      <div class="header">
          <div class="header-left" @click="$router.back()">
              <span class="iconfont iconjiantou2"></span>
              <span class="iconfont iconnew"></span>
          </div>
          <span class="focus" v-if='!detail.has_follow' @click='handleFollow'>关注</span>
          <span class="focus focus_active" v-else @click='handleUnfollow'>已关注</span>

      </div>


        <h3>{{detail.title}}</h3>
        
        <p>{{detail.user.nickname}}    2020-9-4</p>
                
      <div class="post-content" v-html='detail.content'>
          
      </div>

  </div>

    <!-- 视频播放页 -->
  <div class="video" v-if="detail.type===2">
      <video src="http://f.video.weibocdn.com/000qVJIEgx07Gb0g1DFR01041200cHgH0E010.mp4?label=mp4_720p&template=720x1280.24.0&trans_finger=c3f00996be5378650057cf237d7bfffd&ori=0&ps=1BThIDDSKizpZI&Expires=1599305190&ssig=FaPc8fvD8J&KID=unistore,video" 
      class="video"
      controls poster="https://wx1.sinaimg.cn/wap720/0080Zzihgy1gibb3ymc4dj30u01hc7ov.jpg"></video>

      <div class="video-info">
          <div class="video-user">
             <img :src="$axios.defaults.baseURL+detail.user.head_img">
             <span>{{detail.user.nickname}}</span> 
          </div>
          
           <span class="focus" v-if='!detail.has_follow' @click='handleFollow'>关注</span>
           <span class="focus focus_active" v-else @click='handleUnfollow'>已关注</span>
      </div>
  </div>


        <!-- 点赞 -->
    <div class="post-btns">
        <span @click="handleLike" :class="{like_active:detail.has_like}">
            <i class="iconfont icondianzan"></i>
            {{detail.like_length}}
        </span>
         
        <span>
            <i class="iconfont iconweixin"></i>
           微信
        </span>
    </div>

    <!-- 跟帖部分 -->
    <div class="footer">
         <PostFooter :post='detail' @handleStar='handleStar'></PostFooter>
    </div>
  </div>
 
</template>

<script>
import PostFooter from "@/components/PostFooter"

export default {
    data(){
        return{
            //文章详情
            detail:{
                //user需要在模板中渲染，不然页面会报错
                user:{}
            }
        }
    },
    components:{
        PostFooter
    },
    methods:{
        // 关注当前作者
        handleFollow(){
            // 通过作者id关注用户
            this.$axios({
                url:'/user_follows/'+this.detail.user.id,
                // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                },
            }).then(res=>{
                
                const {message} = res.data;

                if(message === "关注成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_follow = true;
                    this.$toast.success(message)
                }
                
            })
        },

       // 取消关注
        handleUnfollow(){
            // 通过作者id关注用户
            this.$axios({
                url: "/user_unfollow/" + this.detail.user.id,
                // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const {message} = res.data;

                if(message === "取消关注成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_follow = false;
                    this.$toast.success(message)
                }
            })
        },

        //点赞
        handleLike(){
            this.$axios({
                url: "/post_like/" + this.detail.id,
                // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const {message} = res.data;

                if(message === "点赞成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_like = true;
                    this.detail.like_length++;
                }

                 if(message === "取消成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_like = false;
                    this.detail.like_length--;
                }
                    this.$toast.success(message)

            })
        }  ,
        
        //收藏
        handleStar(){
            this.$axios({
                url: "/post_star/" + this.detail.id,
                // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }).then(res => {
                const {message} = res.data;

                if(message === "收藏成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_star = true;
                   
                }

                if(message === "取消成功"){
                    // 修改关注的按钮的状态
                    this.detail.has_star = false;
                }

                this.$toast.success(message)

            })
        }  
    },



    // 请求文章的详情
    mounted(){
        // 请求文章的详情
        const {id}=this.$route.params;
        // token
        const token=localStorage.getItem('token')
        //请求配置
        const config={
            url:'/post/'+id
        }

        if(token){
            config.headers={
                Authorization: token
            }
        }
        this.$axios(config).then(res=>{
            const {data}=res.data
            //保存到详情
            this.detail=data
        })        
    }
}
</script>

<style scoped lang='less'>
.container{
     padding-bottom: 100/360*100vw;
     .video{
         width:100%;
         
         .video-info{
             padding: 10px;
             display: flex;
             justify-content: space-between;
             align-items: center;
             font-size: 12px;
             color: #999;
             
             .video-user{
                 display: flex;
                 align-items: center;
             }
             img{
                 height: 20px;
                 width: 20px;
                 border-radius: 50%;
                 padding-right: 10px;
             }
         }
            .focus{
                width: 62/360*100vw;
                height: 26/360*100vw;
                line-height: 26/360*100vw;
                text-align: center;
                font-size: 12px;
                background:red;
                color: #fff;
                border-radius: 100px;
                border: 1px red solid ;

            }
            .focus_active{
                border: 1px #cccccc solid ;
                background: none;
                color: #333;
            }
     }
     
    .article{
        padding:0 15px;
        border-top:25px solid #747474;
        .header{ 
            height: 60/360*100vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
           
            .header-left{
                *{
                    vertical-align: middle;  
                }
            }
            .iconnew{
                font-size: 50px;
            }
            .focus{
                width: 62/360*100vw;
                height: 26/360*100vw;
                line-height: 26/360*100vw;
                text-align: center;
                font-size: 12px;
                background:red;
                color: #fff;
                border-radius: 100px;
                border: 1px red solid ;

            }
            .focus_active{
                border: 1px #cccccc solid ;
                background: none;
                color: #333;
            }
        }
        h3{
            margin-bottom: 5px;
        }
        p{
            font-size: 12px;
            color: #868a8b;
            margin-bottom:10px;
        }
        .post-content{
            line-height: 1.5;;
            //img是由服务器返回的标签，不属于当前的页面，不受scoped的影响
            /deep/ img{
                max-width:100%;
            }
           
        }
    }
    
    .post-btns{
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
        span{
            padding: 0 15px;
                font-size: 12px;
                // width: 62/360*100vw;
                height: 30/360*100vw;
                line-height: 26/360*100vw;
                text-align: center;
                border-radius: 50px;
                border: 1px solid #ccc;
                *{
                    vertical-align: middle;
                }
        }
        .iconweixin{
            color: #01c801;
        }
        .like_active{
            border:1px solid red;
            i{
                color:red;
            }
        }
        
    }
}    
</style>