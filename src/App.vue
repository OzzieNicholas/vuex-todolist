<template>
  <div id="app">
    <a-input  placeholder="请输入任务"
              class="my_ipt"
              :value="inputValue"
              @change="handleInputChange"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkedChange($event, item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey==='all'?'primary':'default'" @click="changeStyle('all')">全部</a-button>
          <a-button :type="viewKey==='unDone'?'primary':'default'" @click="changeStyle('unDone')">未完成</a-button>
          <a-button :type="viewKey==='done'?'primary':'default'" @click="changeStyle('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  export default {
    name: "app",
    data() {
      return {
        
      }
    },
    created() {
      this.$store.dispatch("getList")
    },
    computed: {
      ...mapState(["inputValue", "viewKey"]),
      ...mapGetters(["unDoneLength", "infoList"])
    },
    methods: {
      handleInputChange(e) {  // e 是事件参数
        // 拿到输入框中的值
        console.log(e.target.value);
        this.$store.commit("setInputValue", e.target.value)
      },
      // 向列表中新增 item 项
      addItemToList() {
        // 如果用户输入内容为空，则不应该添加此项
        if(this.inputValue.trim().length <= 0) {
          // 弹出一个警告框，表示不能为空
          return this.$message.warning("文本框内容不能为空")
        }
        this.$store.commit("addItem")
      },
      // 根据 id 删除 item 项
      deleteItemById(id) {
        this.$store.commit("deleteItem", id)
      },
      // 根据 id 改变复选框
      checkedChange(e, id) {
        this.$store.commit("changeChecked", id)
      },
      // 清楚已完成项
      clean() {
        this.$store.commit("cleanDone")
      },
      // 修改页面上的显示列表
      changeStyle(key) {
        this.$store.commit("changeView", key)
      }
    }
  }
</script>

<style scoped>
  #app {
    padding: 10px;
  }

  .my_ipt {
    width: 500px;
    margin-right: 10px;
  }

  .dt_list {
    width: 500px;
    margin-top: 10px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>