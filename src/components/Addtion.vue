<template>
  <div>
    <h3>当前最新的 count 值为：{{ this.$store.state.count }}</h3>
    <button @click="add">加1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    add() {
      this.$store.commit("add")
    }
  }
}
</script>