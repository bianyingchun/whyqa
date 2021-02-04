<template>
  <w-layout title="问题录入"
            class="include_qa_wraper">
    <div slot="siderbar"
         class="siderbar_content">
      <question-list title="已收录问题列表"
                     :show_list="current_show_type === 'standard'"
                     :list="standard_list"
                     type="standard"
                     @toggle_list="toggle_question_list"
                     @set_current_question="set_question"></question-list>
      <question-list title="待定答案问题列表"
                     :show_list="current_show_type === 'with_answer'"
                     type="with_answer"
                     :list="with_answer_list"
                     @toggle_list="toggle_question_list"
                     @set_current_question="set_question"></question-list>
      <question-list title="无答案问题列表"
                     :show_list="current_show_type === 'without_answer'"
                     type="without_answer"
                     :list="without_answer_list"
                     @toggle_list="toggle_question_list"
                     @set_current_question="set_question"></question-list>
    </div>
    <div slot="content">
      <include-qa-item :current_question="current_question"
                       @update_list="update_list" />
    </div>
  </w-layout>

</template>

<script>

import WLayout from '@/components/w-layout'
import IncludeQaItem from '@/components/include-qa-item'
import QuestionList from '@/components/question-list'
// { get_standards_list, get_with_answer_list, get_without_answer_list } 
import * as request from '@/api/search'
export default {
  data () {
    return {
      standard_list: [],
      with_answer_list: [],
      without_answer_list: [],
      current_show_type: '',
      current_question: null
    }
  },
  methods: {
    toggle_question_list (type) {
      if (this.current_show_type === type) {
        this.current_show_type = ''
      } else {
        this.current_show_type = type;
        if (!this[type + '_list'].length) {
          request['get_' + type + '_list']().then(res => {
            this[type + '_list'] = res.data.result
          })
        }
      }
    },
    set_question (item) {
      this.current_question = item
    },
    update_list (item) {
      const { source, type } = item;
      if (type !== 'standard') {
        const index = this[type + '_list'].findIndex(obj => obj.id === source.id)
        if (index !== -1) {
          this[type + '_list'].splice(index, 1)
        }
        if (this.standard_list.length) {
          this.standard_list.push(source)
        }
      }
    }
  },
  components: {
    WLayout,
    IncludeQaItem,
    QuestionList
  },
}
</script>

<style lang="scss" scoped>
.include_qa_wraper {
  .siderbar_content {
    padding: 10px 0;
  }
}
</style>