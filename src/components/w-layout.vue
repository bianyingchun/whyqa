<template>
  <div :class="['w_layout', {'sidebar-open':sidebar_open}]">
    <div class="navbar">
      <div class="sidebar-btn"
           @click="toggle_sidebar">
        X
      </div>
      <a href="#">{{title}}</a>
    </div>
    <div class="sidebar-mask"
         @click="toggle_sidebar"></div>
    <div class="sidebar">
      <slot name="siderbar"></slot>
    </div>
    <div class="main">
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    title: String,
  },
  data () {
    return {
      sidebar_open: false,
    }
  },
  methods: {
    toggle_sidebar () {
      this.sidebar_open = !this.sidebar_open;
    },
  }
}
</script>
<style lang="scss" scoped>
.w_layout {
  .navbar,
  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
  }
  .navbar {
    color: $themeFrontColor;
    z-index: 20;
    right: 0;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
    padding: 0.7rem 1.5rem;
    line-height: 2.2rem;
    a {
      display: inline-block;
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      position: relative;
    }
    .sidebar-btn {
      display: none;
      width: 1.25rem;
      height: 1.25rem;
      position: absolute;
      padding: 0.6rem;
      top: 0.6rem;
      left: 1rem;
      cursor: pointer;
    }
  }
  .sidebar-mask {
    z-index: 9;
    width: 100vw;
    height: 100vh;
    display: none;
  }
  &.sidebar-open .sidebar-mask {
    display: block;
  }
  .sidebar {
    font-size: 15px;
    background-color: #fff;
    width: 20rem;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    box-shadow:4px 0px 20px 0px #d1d8e0;
    overflow-y: auto;
  }
  .main {
    padding-left: 20rem;
    padding-bottom: 2rem;
    .content {
      padding: 4rem 2.5rem 2rem 2.5rem;
      margin: 0 auto;
      max-width: 740px;
    }
  }
}

@media (max-width: 959px) {
  .w_layout {
    .main {
      padding-left: 16.4rem;
      .content {
        padding: 4rem 2rem 2rem 2rem;
      }
    }
    .sidebar {
      font-size: 15px;
      width: 16.4rem;
    }
  }
}

@media (max-width: 719px) {
  .w_layout {
    .navbar {
      padding-left: 4rem;
      .sidebar-btn {
        display: block;
      }
    }
    .main {
      padding-left: 0;
      .content {
        padding: 4rem 1.5rem 1.5rem 1.5rem;
      }
    }
    .sidebar {
      top: 0;
      padding-top: 3.6rem;
      transform: translateX(-100%);
      transition: transform 0.2s ease;
    }
    &.sidebar-open .sidebar {
      transform: translateX(0);
    }
  }
}
</style>
