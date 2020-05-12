const defaultStore = {  // 默认数据
    inputValue: 'write something',
    list: [
        '早晨早起，锻炼身体',
        '中午下班游泳一个小时'
    ]
};
export default (state = defaultStore, action) => {
    console.log(action);
    if (action.type === 'change_input_value') {
        let newState = JSON.parse(JSON.stringify(state)); // 深度拷贝
        newState.inputValue = action.value;
        return newState
    }
    return state
}