import HeaderNormal from '@/components/HeaderNormal'

//评论楼层组件 -->
import CommentFooter from '@/components/CommentFooter'
//页面发表评论的底部
import PostFooter from '@/components/PostFooter'
export default {
    data(){
        return{
            //评论的列表
            comment:[],
            // 文章的详情
            detail:{},
            // 保存点击回复的评论
            replyComment:null,

            //分页的参数
            loading:false,

            finished:false,
            pageIndex:1,
            pageSize:10
        }
    },

    
        // 注册组件
    components:{
        HeaderNormal,
        CommentFooter,
        PostFooter
    },
    
    methods:{
        //请求评论的列表
        getComments(id,isReply){

            //如果评论发布成功，初始化分页的数据和列表数据
            if(isReply=='isReply'){
                this.pageIndex=1,
                this.comment=[]
            }

            //请求文章的评论
            this.$axios({
                //条数默认是10
                url:`/post_comment/${id}?pageIndex=${this.pageIndex}`
            }).then(res=>{
                console.log(res.data);
                
                const {data}=res.data
                // 覆盖评论列表
                this.comment=[...this.comment,...data]
                // 加载完之后手动的变为false
                this.loading=false;

                if(data.length<this.pageSize){
                    this.finished=true;
                    return;
                }
                //页数加1
                this.pageIndex++
            })
        },

        //点击回复按钮时候触发的方法
        handleReply(item){
            this.replyComment=item;
        },

        //评论加载更多
        onLoad(){

            const {id}=this.$route.params;
            setTimeout(()=>{
                    this.getComments(id)
            },2000)
        }
    },
    mounted(){
        //文章详情
        const {id}=this.$route.params;
        //请求文章的评论
        this.getComments(id);
         
        //文章详情
        const config={
            url:'/post/'+id
        }

        const token=localStorage.getItem('token')

        if(token){
            config.headers={
                Authorization:token
            }
        }
        this.$axios(config).then(res=>{
            const {data}=res.data
            this.detail=data
        })
    }
}