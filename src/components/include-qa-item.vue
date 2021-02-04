<template>
  <div class="include_qa_item">
    <div class="query_wraper">
      <div class="input_box">
        <input type="text"
               v-model="query_text"
               placeholder="请输入问题" />
        <button @click="query">搜索</button>
      </div>
      <div class="tiplist_box"
           v-show="tiplist.length">
        <div class="tip_item"
             v-for="(item, index) in tiplist"
             :key="index"
             @click="get_tip_info(item)">
          <div class="text">{{item.source.query_text}} </div>

          <span :class="['iconfont', 'icon-question_'+item.type]"></span>
        </div>
      </div>
    </div>

    <div class="result_box" v-show="result.question.query_text">
      <q-info v-bind="result"
              @answer_edited="handle_answer_edited"
              @toggle_question="get_tip_info"
              @show_article="get_article_info" />
    </div>
    <transition name="slide-fade">
      <article-item v-bind="article_info"
                    v-if="show_article"
                    class="article_info"
                    @hide="handle_article_hide" />
    </transition>
  </div>

</template>

<script>
import { throttle, debounce } from '@/common/js/util'
import { query_q, get_q_with_answer, search, update_question, get_article } from '@/api/search'
import QInfo from '@/components/q-info'
import ArticleItem from '@/components/article-item'
export default {
  props: {
    current_question: Object
  },
  data () {
    return {
      query_text: '',
      tiplist: [],
      result: {
        question: {

        },
        paragraphs: [],
        sim_questions: [],
        keywords: [],
        answer_in_p: -1
      },
      question_from: 'standard',
      show_article: false,
      article_info: {
        title: '',
        paragraphs: []
      }
    }
  },
  methods: {
    reset_query () {
      this.tiplist = []
      this.query_text = ''
    },
    set_result (paragraphs, sim_questions) {
      Object.assign(this.result, { paragraphs, sim_questions })
    },
    get_query_tips: throttle(function () {
      let text = this.query_text.trim()
      if (!text) {
        this.tiplist = []
        return
      }
      query_q(text).then(res => {
        this.tiplist = res.data.result
      }).catch(err => {
        this.$toast('请求失败')
      })
    }),
    get_article_info (aid) {
      get_article(aid).then(res => {
        this.show_article = true;
        this.article_info = res.data.result
      }).catch(err => {
        this.$toast('获取文章详情失败')
      })
    },
    get_info_with_answer (item) {
      get_q_with_answer(item.id).then(res => {
        res = res.data.result;
        this.question_from = 'with_answer'
        Object.assign(this.result, { question: item, ...res, answer_in_p: 0 })
        this.reset_query()
      })
    },
    get_tip_info (item) {
      if (item.type === 'with_answer') {//没有确定答案
        this.get_info_with_answer(item.source)
      } else {
        search(item.source.query_text).then(res => {
          res = res.data.result;
          this.question_from = item.type
          Object.assign(this.result, { question: item.source, ...res, answer_in_p: -1 })
          this.reset_query();
        })
      }
    },
    query: debounce(function () {
      let text = this.query_text.trim()
      if (text) {
        search(text).then(res => {
          res = res.data.result;
          this.question_from = 'standard'
          Object.assign(this.result, { question: { query_text: text }, ...res, answer_in_p: -1 })
          this.reset_query();
        })
      }
    }),
    // TODO 后端保存修改
    handle_answer_edited (value) {
      let question = this.result.question
      if (question.answers) {
        question.answers[0].text = value
      } else {
        question.answers = [{ text: value }]
      }
      update_question(this.result.question, this.question_from).then(res => {
        res = res.data;
        if (res.error) {
          this.$toast('保存失败')
        } else {
          Object.assign(this.result, { question })
          // 通知父组件更新列表
          this.$emit('update_list', { source: this.result.question, type: this.question_from })
          // console.log(this.result.question, this.question_from)
        }
      })
    },
    handle_article_hide () {
      this.show_article = false;
    }
  },
  components: {
    QInfo,
    ArticleItem,
  },
  watch: {
    'query_text': function (newval, oldval) {
      newval = newval.trim()
      oldval = oldval.trim()
      if (oldval === newval) return
      this.get_query_tips()
    },
    "current_question": function (newval, oldval) {
      this.get_tip_info(newval)
    }
  }
}
</script>

<style lang="scss" scoped>
.include_qa_item {
  .query_wraper {
    position: relative;
    display: inline-block;
    margin: 20px 0;
    .input_box {
      display: flex;
      input {
        width: 300px;
        padding: 10px;
        font-size: 16px;
        outline: none;
        box-sizing: border-box;
        border: 1px solid #9e9e9e;
        &:focus {
          border-color: $themeHlightColor;
        }
      }
      button {
        background: $themeHlightColor;
        padding: 0 20px;
        color: #fff;
      }
    }
    .tiplist_box {
      width: 100%;
      position: absolute;
      left: 0;
      top: 40px;
      background: #fff;
      border: 1px solid #e3e3e3;
      border-top: none;
      .tip_item {
        padding: 5px 10px;
        display: flex;
        font-size: 14px;
        cursor: default;
        .text {
          margin-right: 20px;
          @include text-overflow;
          span {
            float: right;
          }
        }
        &:hover {
          background: #e3e3e3;
        }
      }
    }
  }
  .result_box {
    margin-top: 20px;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>