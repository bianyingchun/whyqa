<template>
  <div id="app">
    <div id="nav">
      <router-link to="/extact_qa" class="link">人工提取问答对</router-link>
      <router-link to="/test_q" class="link">问题测试</router-link>
    </div>
    <router-view class="container"/>
  </div>
</template>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav .link{
  margin:20px;
}
.container{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>
