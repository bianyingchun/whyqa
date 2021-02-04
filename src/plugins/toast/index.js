import Vue from "vue";

import toastComponents from "./toast.vue";

const ToastContructor = Vue.extend(toastComponents);

export function showToast(text, duration = 2000) {
    const toastDom = new ToastContructor({
        el: document.createElement("div"),
        data() {
            return {
                text: text,
                showWrap: true,
                showContent: true,
            };
        },
    });
    document.body.appendChild(toastDom.$el);

    setTimeout(() => {
        toastDom.showContent = false;
    }, duration - 1250);
    setTimeout(() => {
        toastDom.showWrap = false;
    }, duration);
}

function registryToast() {
    Vue.prototype.$toast = showToast;
}

export default registryToast;
