<template>
  <div class="question_list">
    <div class="title"
         @click="get_list">{{title}}
         <span :class="['iconfont', 'icon-question_'+type]"></span>
         </div>
    <div class="list_wraper"
         v-show="show_list">
      <div class="list">
        <div 
             v-for="(item,index) in current_list"
             :key="index" @click="set_current_question(item)"
             :class="['list_item',{'active':current_index===item.id}]">
          {{item.query_text}}
        </div>
      </div>
      <div class="pagination"
           v-show="total_page > 0">
        <span @click="turn_page(current_page-1)" :class="{disable:current_page===0}">prev</span>
        <span>{{current_page+1}} / {{total_page+1}}</span>
        <span @click="turn_page(current_page+1)" :class="{disable:current_page>=total_page}">next</span>
      </div>
    </div>

  </div>
</template>

<script>
const page_size = 25;
export default {
  props: {
    title: String,
    list: Array,
    type:String,
    show_list: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      current_page: 0,
      current_index:-1
    }
  },
  computed: {
    total_page () {
      return Math.floor(this.list.length / page_size)
    },
    current_list () {
      return this.list.slice(this.current_page * page_size, (this.current_page + 1) * page_size)
    }
  },
  methods: {
    turn_page(index){
      if(index < 0 || index > this.total_page) return 
      this.current_page = index
    },
    get_list () {
      this.$emit('toggle_list', this.type)
    },
    set_current_question(item) {
      this.current_index = item.id
      this.$emit('set_current_question', {source:item, type:this.type})
    }
  }
}
</script>

<style lang="scss" scoped>
.question_list {
  .title {
    font-weight: bold;
    font-size: 15px;
    margin: 10px 10px 10px 20px;
    cursor: default;
  }
  .list_wraper {
    position: relative;
    .list {
      .list_item {
        display: block;
        padding: 5px 10px 5px 20px;
        box-sizing: border-box;
        font-size: 14px;
        cursor: pointer;
        &.active {
          border-left: 0.25rem #42b983 solid;
          font-weight: 600;
          color: #42b983;
        }
        &.faved {
          color: orange;
          // border:0.25rem orange solid;
        }
        &:hover {
          color: #42b983;
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: space-around;
      margin: 10px;
      span{
        display: inline-block;
        padding: 5px;
        box-sizing: border-box;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: default;
        &:hover{
          color:#42b983
        }
        &.disable{
          color:#ccc;
        }
      }
    }
  }
}
</style>