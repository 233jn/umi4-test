import { queryUserList, deleteUserById, createUser } from '@/services/user';

export default {
    namespace: "user",
    state: {
        list: [],
        total: 0, //总用户个数
        current: 0, //当前页码
    },
    //纯函数
    reducers: {
        save(state: any, { payload }) {
            const { list, total, current } = payload;
            return { ...state, list, total, current };
        }
    },
    //effects:用于处理异步操作和业务逻辑，不直接修改 state，简单的来说，就是获取从服务端获取数据，并且发起一个 action 交给 reducer。其中它用到了redux-saga，里面有几个常用的函数
    // 参数 payload 表示有效负载的数据，在外部通过dispatch传递
    // put:  用于触发action  yield put({ type: 'todos/add', payload: 'Learn Dva'});
    // call:用于调用异步逻辑，支持Promise，第一个参数是你要调用的函数，第二个参数开始是你要传递的参。const result = yield call(fetch, '/todos');
    // select:用于从state里获取数据。const todos = yield select(state => state.todos);
    effects: {
        //是一个生成器Generator函数，生成函数会默认返回一个迭代器对象Iterator，在生成器函数中可以使用yield关键字
        *fetchUserList({ payload: { current = 1, pageSize = 5 } }, { call, put, select }) {
            //通过call来发送请求获取数据
            const { data } = yield call(queryUserList, { current, pageSize })
            //通过put来触发reducer纯函数的执行，把数据保存到state中
            yield put({
                type: "save",
                payload: data
            })
        },
        //action中新增下面方法
        //根据id删除指定用户  发送请求
        *removeUserById({ payload: { id, current = 1, pageSize = 5 } }, { call, put }) {
            //从服务器删除
            const { data } = yield call(deleteUserById, id, { current, pageSize });
            //从本地删除
            yield put({
                type: 'save',
                payload: data,
            });
        },
    }
}

