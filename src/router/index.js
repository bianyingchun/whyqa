import Vue from "vue";
import VueRouter from "vue-router";
import ExtactQa from "../views/extact-qa.vue";
import TestQ from "../views/test-q.vue";
import ExtactItem from "../components/extact-item.vue";
import UserGuide from "../components/user-guide.vue";
import Test from "../views/test.vue";
import IncludeQa from "../views/include-qa.vue";
import CollectCorpus from "../views/collect-corpus.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/extact-qa",
    name: "extact-qa",
    component: ExtactQa,
    children: [
      {
        path: "",
        component: UserGuide,
      },
      {
        path: "article/:id",
        component: ExtactItem,
      },
      {
        path: "user-guide",
        component: UserGuide,
      },
    ],
  },
  {
    path: "/test-q",
    name: "test-q",
    component: TestQ,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/include-qa",
    name: "include-qa",
    component: IncludeQa,
  },
  {
    path: "/collect-corpus",
    name: "collect-corpus",
    component: CollectCorpus,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
