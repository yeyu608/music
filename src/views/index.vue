<template>
  <div class="inde">
    <h2>在页面(.vue文件获取仓库中方法=>操作仓库)使用辅助函数</h2>
    <h2>我哥哥的{{ bortherAge }}</h2>
    <h2>我姐姐的{{ sAge }}</h2>
    <h2>我哥哥的{{ bortherAge }}</h2>
    <h2>我自己的{{ age }}</h2>
    <h2>我爸爸{{ getFat(30) }}</h2>
    <div @click="changeAge">++</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
// 本质就是将仓库中getters对象中的属性映射到computed中
// mapGetters() => 返回值是一个对象
export default {
  computed: {
    ...mapGetters(["bortherAge", "sAge", "getFat"]),
    ...mapState(["age"]),
  },
  methods: {
    ...mapMutations(["changeAge"]),
    ...mapActions(["changeAge"]),
    add() {
      this.changeAge();
    },
    adds() {
      this.changeAge();
    },
  },
};
</script>

<style>
</style>