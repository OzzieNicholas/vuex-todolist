<template>
  <div>
    <h3>当前最新的 count 值为：{{ this.$store.state.count }}</h3>
    <button @click="sub">减1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    sub() {
      this.$store.commit("sub")
    }
  }
}
</script>