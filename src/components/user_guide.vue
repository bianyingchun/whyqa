<template>
    <div class="user_guide">
         <h4 class="content_title">用户指南</h4>
         <div>
             <div class="block">
                 <div class="title">答案选择要点</div>
                 <div class="text">
                     <p>1.答案应选择可行答案中最短的情况</p>
                     <p>2.尽量保证问题的多样性</p>
                     <p>3.尽量避免使用原文内容提问，使用自己的语言组织</p>
                 </div>
             </div>
             <div class="block">
                 <div class="title">操作指导</div>
                 <img src="@/assets/guide.png" alt="操作指导">
             </div>
             
         </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.user_guide{
    .title{
        font-size: 600;
        margin: 20px 0;
    }
    .text{
        margin-left:20px;
    }
    img{
        width:100%;
        height: auto;
    }
}
</style>