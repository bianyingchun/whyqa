<template>
  <div>
    <tree-item v-for="(item, index) in source"
               :info="item"
               :key="index"
               @open="handle_open"></tree-item>
  </div>
</template>

<script>
import TreeItem from './item'
export default {
  data () {
    return {
      source: [
        {
          value: '大脑与认知',
          children: [
            {

              value: '大脑与认知1',
              children: [
                { value: 'q1', children: [] },
                { value: 'q2' },
                { value: 'q3' },
                { value: 'q4' },
              ]
            }, {
              value: '大脑与认知2',
              children: [
                { value: 'q1' },
                { value: 'q2' },
                { value: 'q3' },
                { value: 'q4' },
              ]
            }
          ]
        }, {
          value: '电子与信息',
          children: [
            {
              value: '电子与信息1',
              children: [
                { value: 'q1' },
                { value: 'q2' },
                { value: 'q3' },
                { value: 'q4' },
              ]
            }, {
              value: '电子与信息2',
              children: [
                { value: 'q1' },
                { value: 'q2' },
                { value: 'q3' },
                { value: 'q4' },
              ]
            }
          ]
        },
        {
          value: '航天与航空',
          children: [
            {
              value: '航天与航空1',
              children: [
                { value: 'q1' },
                { value: 'q2' },
                { value: 'q3' },
                { value: 'q4' },
              ]
            },
            {
              value: '航天与航空2',
              children: [
                { value: 'q1' },
                { value: 'q2' },
                { value: 'q3' },
                { value: 'q4' },
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handle_open (value) {
      console.log('打开链接', value)
    }
  },
  components: { TreeItem }
}
</script>

<style>
</style>