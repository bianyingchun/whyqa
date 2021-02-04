<template>
  <w-layout title="人工提取问答对"
            class="extact_qa disable_select">
    <div slot="siderbar"
         class="siderbar_content">
      <router-link class="list_item title"
                   to="/extract-qa/user_guide">用户指南</router-link>
      <div class="title">文章列表</div>
      <div class="article_list">
        <router-link class="list_item"
                     v-for="item in articles"
                     :key="item.id"
                     :to="'/extact-qa/article/'+item.id"
                     :class="{'faved':item.fav}">{{item.title}}</router-link>
      </div>
    </div>
    <div slot="content">
      <router-view></router-view>
    </div>
  </w-layout>
</template>
<script>
import WLayout from '@/components/w-layout.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
    this.get_articles();
  },
  computed: {
    ...mapGetters('extact_qa', [
      'articles',
    ]),

  },
  methods: {
    ...mapActions('extact_qa', [
      'get_articles'
    ]),
  },
  components: {
    WLayout
  }
}
</script>
<style lang="scss" scoped>
.extact_qa {
  .siderbar_content {
    .title {
      font-weight: bold;
      font-size: 15px;
      padding: 10px 10px 10px 20px;
    }
    .list_item {
      display: block;
      padding: 10px 10px 10px 20px;
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
}
.router-link-active {
  border-left: 0.25rem #42b983 solid;
  font-weight: 600;
  color: #42b983;
}
</style>
