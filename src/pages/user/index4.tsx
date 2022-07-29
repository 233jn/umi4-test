import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'

export default function Page() {
  // 3.请求依赖
  const { data, loading, run, mutate } = useRequest(() => queryUserList({
    current: 1,
    pageSize: 10
  }), {
    // manual: true,
    // 请求轮询：每隔1秒钟向服务器发送一次请求
    // pollingInterval: 1000,
    // 屏幕不可见时,暂时暂停定时任务
    // pollingWhenHidden: false,
    // 函数去抖
    // debounceInterval: 500,
    // 函数节流(最多2秒发一次请求)
    // throttleInterval: 2000,
    // 浏览器窗口refocus,revisible时,会重新发起请求(窗口最大最小化)
    // refreshOnWindowFocus: true,
    // focusTimespan: 1000,
  });


  return (
    <div>
      <button onClick={() => run()}>点我发送请求</button>
      <h3 className={styles.title}>
        <div>
          {loading ? <div>loading...</div> : JSON.stringify(data)}
        </div>
      </h3>
      <button onClick={()=>mutate("2222")}>修改修改data</button>
    </div>
  );
}
