<template>
  <div class="tree_item">
    <div :class="['title', {floder:expandable}]"
         @click="toggle_expand">{{info.value}}</div>
    <div class="content"
         v-if="expandable && expand">
      <tree-item v-for="(item,index) in info.children"
                 :key="index"
                 :info="item"
                 @open="handle_open"></tree-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    info: Object
  },
  data () {
    return {
      expand: false
    }
  },
  computed: {
    expandable () {
      const children = this.info.children
      return children && children.length
    }
  },
  methods: {
    toggle_expand () {
      this.expand = !this.expand;
      if (!this.expandable) {
        this.$emit('open', this.info.value)
      }
    },
    handle_open (value) {
      this.$emit('open', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree_item {
  padding-left: 20px;
  cursor: default;
  .title {
    margin-top: 2px;
    padding: 5px 10px;
    &.floder {
      border-left: 5px solid $themeHlightColor;
    }
  }
}
</style>