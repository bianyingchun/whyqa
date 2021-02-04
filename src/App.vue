<template>
  <div id="app">
    <div id="nav">
      <router-link to="/extact-qa"
                   class="link">人工提取问答对</router-link>
      <router-link to="/test-q"
                   class="link">问题测试</router-link>
      <!-- <router-link to="/test"
                   class="link">测试页面</router-link> -->
      <router-link to="/include-qa"  class="link">问题录入</router-link>
      <router-link to="/collect-corpus"  class="link">问句语义相似度语料收集</router-link>
    </div>
    <router-view class="container" />
  </div>
</template>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .link {
  margin: 20px;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: #fff;
}
</style>
