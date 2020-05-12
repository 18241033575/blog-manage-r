import { createStore } from 'redux';    // 引入方法
import reducer from './reducer'
const store = new createStore(reducer);     // 创建数据存储仓库
export default store;     // 暴露出仓库
