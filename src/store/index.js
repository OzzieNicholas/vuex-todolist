import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的内容
    inputValue: "something...",
    // 下一个 id
    nextId: 5,
    // 不同的数据列表
    viewKey: "all"  // 默认为全部数据
  },
  mutations: {
    initList(state, list) {  // 第一个参数只能是 state
      state.list = list
    },
    // 为 store 中的 inputValue 赋值
    setInputValue(state, value) {
      state.inputValue = value
    },
    // 添加列表项
    addItem(state) {
      const obj = {  // 定义一个对象常量
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId ++
      state.inputValue = ""
    },
    // 删除列表项
    deleteItem(state, id) {
      // 根据 id 来查找对应项的索引
      // 如果未找到，那么 findIndex 方法会返回给 index 的值为 -1
      const index = state.list.findIndex(item => item.id === id)
      // 根据索引查找对应元素
      if(index != -1) {  // 找到就删除
        state.list.splice(index, 1)
      }
    },
    // 改变复选框状态
    changeChecked(state, id) {
      // 根据 id 来查找对应项的索引
      // 如果未找到，那么 findIndex 方法会返回给 index 的值为 -1
      const index = state.list.findIndex(item => item.id === id)
      // 根据索引查找对应元素
      if(index != -1) {  // 找到就改变状态
        state.list[id].done = !state.list[id].done
      }
    },
    // 清除已完成项
    cleanDone(state) {
      // 过滤掉已完成的项，返回未完成的项
      state.list = state.list.filter(item => item.done===false)
    },
    // 修改视图的关键字
    changeView(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get("../../list.json").then(({data}) => {
        // 将 data 传给 initList
        context.commit("initList", data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      // 过滤出未完成的项，返回已完成的项的个数
      return state.list.filter(item => item.done===false).length
    },
    infoList(state) {  // 根据按钮返回对应的数据
      if(state.viewKey === "all") {
        return state.list
      }
      if(state.viewKey === "unDone") {
        return state.list.filter(item => !item.done)
      }
      if(state.viewKey === "done") {
        return state.list.filter(item => item.done)
      }
    }
  },
  modules: {
    
  }
})
