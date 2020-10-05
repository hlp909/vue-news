<template>
    <div>
        <HeaderNormal title='我的跟帖'></HeaderNormal>

        <!-- 评论列表 -->
        <div class="conment-item"
        v-for="(item,index) in list"
        :key="index">
            <div class="time">2020-9-2 18:59</div>

            <!-- 当前的评论回复的评论 -->
            <div class="parent" v-if='item.parent'>
                <div class="parent-title">
                    @:{{item.parent.user.nickname}}
                </div>

                <div class="parent-content">
                    {{item.parent.content}}
                </div>
            </div>

            <!-- 个人评论的内容 -->
            <div class="content">
                {{item.content}}
            </div>

            <router-link to='#' class="article-link">
                <p>
                    原文：{{item.post.title}}
                </p>
                <span class='iconfont iconjiantou1'></span>
            </router-link>
            
        </div>
    </div>

</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";

export default {
    data(){
        return {
            list:[]
        }
    },
    components:{
        HeaderNormal
    },
    mounted(){
        //请求评论列表
        this.$axios({
            url:'/user_comments',
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            },
        }).then(res=>{
            // console.log(res);
            const {data}=res.data
            //保存到data
            this.list=data
            
        })

        }
    }

</script>

<style scoped lang='less'>
    .conment-item{
        padding:15px;
        font-size: 14px;
        line-height: 1.8;
        border-bottom: 1px solid #ccc;
        .time{
            font-size: 12px;
            color: #a99a91;
            margin-bottom: 5px;
        }
        .parent{
            background: #ededed;
            padding: 10px;
            margin-bottom: 5px;

            .parent-title{
                font-size: 12px;
                color: #a99a91;

            }
        }
        .content{
            margin-bottom: 5px;
        }
        .article-link{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #a99a91;

            p{
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            } 
        }
    }
</style>