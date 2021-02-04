<template>
  <div class="question_info">
    <div class="block user_q">
      <h4 class="title">问题</h4>
      <div class="content">{{question.query_text}}</div>
    </div>
    <div class="block ref_ps">
      <h4 class="title">相关段落</h4>
      <div class="content">
        <div v-for="(item, index) in paragraphs"
             :key="index"
             class="ref_p_item">
          <div class="info_box">
            <div class="toggle_bar"
                 @click="toggle_expand(index)"><span v-if="check_expand(index)">收起详情</span><span v-else>展开详情</span></div>
            <div class="info_content"
                 v-show="check_expand(index)">
              <div class="article">
                <span class="label">所在文章</span>
                <div class="info"><span class="link"
                        @click="get_link_article(item.source.aid)">{{item.source.title}}</span></div>
              </div>
              <div class="ref_qs"
                   v-if="item.source.qas.length">
                <span class="label">相关问题</span>
                <div class="info qa_list">
                  <div class="qa_item"
                       v-for="(qa, index) in item.source.qas"
                       :key="index">
                    <span class="link"
                          @click="get_link_question(qa)">{{qa.query_text}}</span>
                    <!-- <div class="answer">{{qa.answers[0].text}}</div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="p_text"
               v-html="hightlight_keywords(item.source.context, index)"></div>
        </div>
      </div>
    </div>
    <div class="block ref_answer">
      <h4 class="title">答案</h4>
      <div class="content">
        <div class="text_box">
          <textarea class="text"
                    :value="question.answers ? question.answers[0].text:''"
                    :disabled="!is_editing_answer"
                    @input="handle_answer_change"
                    ref="textBox"></textarea>
          <div class="edit_tools"
               v-if="is_editing_answer">
            <span @click="ensure()"
                  class="iconfont icon-select"></span>
            <span @click="cancel()"
                  class="iconfont icon-cancel"></span>
          </div>
          <div class="edit_tools"
               v-else>
            <span @click="edit()"
                  class="iconfont icon-Edit"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="block sim_qs">
      <h4 class="title">相似问题</h4>
      <div class="content">
        <div v-for="(item, index) in sim_qs"
             :key="index"
             class="sim_q_item"
             @click="handle_toggle_question(item)">
          {{item.source.query_text}}
          <span :class="['iconfont', 'icon-question_'+item.type]"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    paragraphs: {
      type: Array,
    },
    sim_questions: {
      type: Array
    },
    keywords: Array,
    answer_in_p: Number
  },
  data () {
    return {
      is_editing_answer: false,
      user_answer: '',
      expands: []
    }
  },
  computed: {
    check_expand () {
      return function (index) {
        return this.expands.indexOf(index) !== -1;
      }
    },
    sim_qs () {
      if (!this.question.id) return this.sim_questions
      return this.sim_questions.filter(item => {
        return item.source.id !== this.question.id
      }).slice(0, 5)
    }
  },
  methods: {
    toggle_expand (index) {
      const idx = this.expands.indexOf(index)
      if (idx === -1) {
        this.expands.push(index)
      } else {
        this.expands.splice(idx, 1)
      }
    },

    hightlight_keywords (text, index) { //关键词高亮
      if (index === this.answer_in_p) {
        text = this.hightlight_answer(text)
      }
      for (let i = 0; i < this.keywords.length; i++) {
        let re = new RegExp(this.keywords[i], 'g');
        if (re.test(text)) {
          text = text.replace(re, '<span class="highlight">$&</span>')
        }
      }
      return text
    },
    hightlight_answer (text) {
      const answer = this.question.answers[0]
      const start_index = answer.answer_start
      const end_index = start_index + answer.text.length
      text = text.substring(0, start_index) + `<span class="answer_highlight">${answer.text}</span>` + text.substring(end_index)
      return text
    },
    edit () {
      this.is_editing_answer = true;
      this.user_answer = this.question.answers ? this.question.answers[0].text : ''
    },
    cancel () {
      this.is_editing_answer = false;
    },
    ensure () {
      this.is_editing_answer = false;
      this.$emit('answer_edited', this.user_answer)
      // this.$nextTick(() => {
      //   const textBoxDom = this.$refs.textBox
      //   textBoxDom.style.height = textBoxDom.scrollHeight + 'px'
      // })
    },
    handle_answer_change (e) {
      this.user_answer = e.target.value;
    },
    handle_toggle_question (item) {
      this.$emit('toggle_question', item)
    },
    get_link_question (item) {
      // console.log(item)
      // item = { id: item.id, query_text: item.question, answers: item.answers }
      this.$emit('toggle_question', { source: item, type: 'with_answer' })
    },
    get_link_article (id) {
      this.$emit('show_article', id)
    }
  }
}
</script>

<style lang='scss' scoped>
.question_info {
  .block {
    margin-bottom: 30px;
    > .title {
      padding: 10px;
      border-left: 10px solid $themeHlightColor;
      background: #eaedf1;
      margin: 10px 0;
    }
    .content {
      line-height: 30px;
    }
  }
  .ref_ps {
    .content {
      border: 1px solid #ccc;
      border-radius: 8px;
      .ref_p_item {
        border-bottom: 1px solid #ccc;
        > div {
          padding: 10px;
        }
        &:last-of-type {
          border-bottom: none;
        }
        .info_box {
          border-bottom: 1px solid #ddd;
          font-size: 14px;
          .toggle_bar {
            display: inline-block;
            cursor: pointer;
            color: #808080;
          }
          .info_content {
            > div {
              display: flex;
              .label {
                margin-right: 20px;
                color: $themeHlightColor;
              }
              .info {
                flex: 1;
                .link {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
  .ref_answer {
    .text_box {
      display: flex;
      .text {
        flex: 1;
        border-radius: 5px;
        border: 1px solid #ccc;
        resize: none;
        outline: none;
        line-height: 30px;
        font-size: 14px;
        padding: 10px;
        &:disabled {
          background: none;
          border: none;
        }
      }
      .edit_tools {
        span {
          font-size: 18px;
          margin-left: 10px;
        }
      }
    }
  }
  .sim_qs {
    .content {
      .sim_q_item {
        cursor: pointer;
        &:hover {
          color: $themeHlightColor;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.answer_highlight {
  color: #e79494;
}
.highlight {
  text-decoration: underline;
}
</style>