<template>
  <div>
      <HeaderNormal title='我的关注'></HeaderNormal>
     <!-- 关注用户的列表 :src="  -->
      <!-- :key="index"为给for每一个循环的元素打上一个标识，方便页面的数据刷新 -->
      <div class="follow-item" 
      v-for="(item, index) in list"
      :key="index" >
          <img :src="$axios.defaults.baseURL+item.head_img" alt="">

          <div class="item-center">
              <p>{{item.nickname}}</p>
              <span>2020-9-2</span>
          </div>
          <span class="cancel" @click="handlCancel(index)">取消关注</span>
      </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal";

export default {
    data(){
        return {
            //关注列表
            list:[]
        }
    },
    components: {
        HeaderNormal,
    },
    methods:{
        //取消关注
        handlCancel(index){
            let id=this.list[index].id
            // console.log(id);
            
            this.$axios({
                url:'/user_unfollow/'+id,
                // 添加头信息
                headers: {
                    Authorization: localStorage.getItem("token")
                },
            }).then(res=>{
                const {message}=res.data
                console.log(message);
                
                if(message==='取消关注成功'){
                    this.list.splice(index,1)
                    this.$toast.success(message)
                }
            })
            
        }
    },
    mounted(){
        // 请求用户关注的列表
        this.$axios({
            url: "/user_follows",
            // 添加头信息
            headers: {
                Authorization: localStorage.getItem("token")
            },
        }).then(res => {
            console.log(res);
            
            const {data} = res.data;

            // 赋值给关注的列表
            this.list = data;
        })
    }
}
</script>

<style scoped lang='less'>
    .follow-item{
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e0e0db;
        .item-center{
            flex: 1;
            padding: 0px 10px;
            span{
                font-size: 12px;
                color: #c1aeb2;
            }
        }
        img{
            display: block;
            height: 60/360*100vw;
            width: 60/360*100vw;
            border-radius: 50%;
        }
        .cancel{
            display: block;
            height: 26px;
            line-height: 26px;
            background: #e0e0db;
            padding: 0 10px;
            border-radius: 50px;
            font-size: 12px;
        }
    }
</style>