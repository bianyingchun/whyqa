<template>
  <w-layout title="问句语义相似度语料收集">
    collect-corpus
    <div slot="siderbar">
      <Tree></Tree>
    </div>
    <div slot="content">
      <div class="block">
        <div class="title">标准问题</div>
        
      </div>
      <div class="block">
        <div class="title">同义问题</div>
        <div class="question_list">
          
        </div>
      </div>
    </div>
  </w-layout>
</template>

<script>
import WLayout from '@/components/w-layout.vue'
import Tree from '@/components/tree'
export default {
  data () {
    return {}
  },
  methods: {

  },
  components: {
    WLayout,
    Tree
  }
}

</script>

<style lang="scss" scoped>
</style>
