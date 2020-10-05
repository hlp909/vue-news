<template>
  <div class="footer-wrap">
      <!-- 普通页脚 -->
        <div class="footer" v-show="!isFocus">
            <input type="text" placeholder="写跟帖" @focus="handleFocus">
           
           <!-- 跳转到评论页面 -->
           <router-link :to="`/post_comment/${post.id}`">
                <span class="comment">
                    <em>{{post.comment_length}}</em>
                        <i class="iconfont iconpinglun-"></i>
                </span>
            </router-link>

                    <!-- 收藏 -->
                    <i class="iconfont iconshoucang" :class="{star_active:post.has_star}" @click="$emit('handleStar')"></i>
                    <i class="iconfont iconfenxiang"></i>
        </div>

        <!-- 输入评论页脚 -->
        <div class="footer-comment" v-show="isFocus">
            <textarea 
            rows="3" 
            ref="textarea" 
            v-model="value" 
            :placeholder="placeholder"
            @blur="handleBlur" 
            :autofocus="isFocus">
            </textarea>
            <span @click="handleSubmit">发送</span>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //输入框是否获得焦点
            isFocus:false,
            // 评论的内容
            value:'',
            //输入框的提示文字
            placeholder:'写跟帖'
        }
    },
    //replayComment是要回复的评论
    props:['post','replyComment'],

    watch:{
        replyComment(){
            // 评论有值的时候才显示@用户名
            if(this.replyComment){
                 this.isFocus=true;
                  this.placeholder='@'+this.replyComment.user.nickname;
            }
           
        }
    },

    methods:{
        //获取焦点的时候触发
        handleFocus(){
           this.isFocus = true;
            console.log(this.isFocus);
        },

        //输入框失去焦点的时候触发
        handleBlur(){
            if(!this.value){
                this.isFocus = false;

                //如果有回复的评论，清空回复的评论
                if(this.replyComment){
                    this.$emit('handleReply',null)
                    this.placeholder='写跟帖'
                } 
            }

            
        },
        //发送评论
        handleSubmit(){
            if(!this.value){
                return;
            }

            const data={
                     content:this.value
            }
                    // 如果有回复的话，加上回复的parent_id
            if(this.replyComment){
                data.parent_id=this.replyComment.id
            }
            this.$axios({
                url:'/post_comment/'+this.post.id,
                method:'POST',
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data
            }).then(res=>{
                // console.log(res.data);
                const {message} = res.data;

                if(message === "评论发布成功"){
                    // 触发父组件方法更新评论的列表
                    this.$emit("getComments", this.post.id,'isReply');

                    // 隐藏输入框
                    this.isFocus = false;
                    //清空输入框的值
                    this.value=''

                    // 滚动到底部
                    window.scrollTo(0,0)

                }
                
            })
        }
    }
}
</script>

<style scoped lang='less'>
    .footer-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #ddd;
        padding: 0 10px;
        box-sizing: border-box;

        .footer-comment{
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            textarea{
                width:260/360*100vw;
                background: #d7d7d7;
                padding: 10px;
                box-sizing: border-box;
                border: none;
                resize: none;
                border-radius: 8px;
            }
            span{
                font-size: 14px;
                background: #fa0000;
                width: 60/360*100vw; 
                height:26/360*100vw;
                line-height:26/360*100vw;
                text-align: center;
                color: #fff;

                border-radius: 50px;
            }
        }
    .footer{
        height: 60/360*100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        input{
            width: 40%;
            height: 36/360*100vw;
            background:#d7d7d7;
            border: none;
            padding: 0 15px;
            border-radius: 50px;
        }
        .comment{
            position: relative;
            display: block;
            em{
                position: absolute;
                display: block;
                background: red;
                color: #fff;
                border-radius: 50px;
                font-size: 10px;
                padding: 0 5px;
                height: 14px;
                line-height: 14px;
                left: 0;
                top: -5px;
            }
        }
        .iconfont{
            font-size: 24px;
        }
        .star_active{
            color:red;
        }
    }
}
</style>