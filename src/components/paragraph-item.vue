<template>
  <div class="p_item">
    <div class="qa_list_box"
         v-if="qas.length">
      <div class="toggle_bar"
           @click="toggle_expand()"><span v-if="expand">收起</span><span v-else></span>相关问题</div>
      <div class="qa_list"
           v-show="expand">
        <div class="qa_item"
             v-for="(qa,index) in qas"
             :key="qa.id"
             @click="set_current_qa(qa)">
          <div class="query_text">
            <span>{{index+1}}. </span>
            {{qa.query_text}}
          </div>
          <!-- <div class="answer"></div> -->
        </div>
      </div>
    </div>
    <div class="text"
         v-html="hightlight_text"></div>
  </div>
</template>

<script>
export default {
  props: {
    context: String,
    qas: Array
  },
  data () {
    return {
      expand: false,
      current_qa: null
    }
  },
  computed: {
    hightlight_text () {
      if (!this.current_qa || !this.expand) return this.context
      const answer = this.current_qa.answers[0]
      const start_index = answer.answer_start
      const end_index = start_index + answer.text.length
      let text = this.context;
      return text.substring(0, start_index) + `<span class="answer_highlight">${answer.text}</span>` + text.substring(end_index)
    }
  },
  methods: {
    toggle_expand () {
      this.expand = !this.expand
    },
    set_current_qa (qa) {
      this.current_qa = qa
    }
  }
}
</script>

<style lang="scss" scoped>
.p_item {
  .qa_list_box {
    font-size: 14px;
    .toggle_bar {
      display: inline-block;
      cursor: pointer;
      color: $themeHlightColor;
    }
    .qa_list {
      background: #eaedf1;
      padding: 5px 0;
      .qa_item {
        padding: 0 5px 5px 5px;
        cursor: pointer;
        &:hover {
          color:$themeHlightColor;
        }
      }
    }
  }
}
</style>
// <style lang="scss">
// .answer_highlight {
//   color: $themeHlightColor;
// }
// .highlight {
//   text-decoration: underline;
// }
// </style>