<template>
  <div>
    <!-- <button @click="showToast">测试</button> -->
    <button @click="testGet()">测试get</button>
    <button @click="testPost()">测试Post</button>
    <button @click="testGet(400)">测试get</button>
    <button @click="testPost(401)">测试Post</button>
    <button @click="testGet(405)">测试get</button>
    <button @click="testPost(500)">测试Post</button>
  </div>
</template>

<script>
import request from "@/api/bin/index.js";
export default {
  methods: {
    testGet (status) {
      request("http://192.168.1.118/test/api", "get", { a: 1, b: 2, status: status })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    testPost (status) {
      request("/test/api", "post", { a: 11, b: 22, status: status })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
