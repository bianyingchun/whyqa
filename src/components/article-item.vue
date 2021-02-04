<template>
  <div class="article_item">
    <span class="close_btn"
          @click="hide">关闭</span>
    <h4 class="header">{{title}}</h4>
    <div class="context">
      <paragraph-item v-for="item in paragraphs"
                      :key="item.id"
                      :context="item.context"
                      :qas="item.qas">
      </paragraph-item>
    </div>
  </div>
</template>

<script>
import ParagraphItem from '@/components/paragraph-item'
export default {
  props: {
    title: String,
    paragraphs: Array
  },
  data () {
    return {
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  },
  components: {
    ParagraphItem
  }
}
</script>

<style lang="scss" scoped>
.article_item {
  background: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  box-shadow: -4px 0px 20px 0px #d1d8e0;
  line-height: 1.8;
  padding: 20px;
  overflow-y: auto;
  z-index: 999;
  .header {
    text-align: center;
  }
  .context {
    margin: 10px 0;
    .p_item {
      margin-top: 10px;
    }
  }
  .close_btn {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 14px;
    cursor: default;
  }
}
</style>