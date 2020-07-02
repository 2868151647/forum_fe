<template>
  <div>
    <div class="ml_nav">
      <ul>
        <li>
          <router-link to="/home/news">最新</router-link>
        </li>
        <li>
          <router-link :to="{path:'/home/focus',query:{userid}}">关注</router-link>
        </li>
        <!-- <li @click="tofocus">关注</li> -->
      </ul>
    </div>

    <div class="content">
      <router-view :key="key"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    tofocus() {
      this.$router.push({
        path: "/home/focus",
        query: { userid: this.userid }
      });
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  props: ["userid"]
};
</script>

<style scoped>
@import "~assets/css/home/content.css";
</style>