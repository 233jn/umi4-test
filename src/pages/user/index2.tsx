import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList } from '@/services/user'

export default function Page() {
  const [current, setCurrent] = useState(1)
  // 2.手动触发请求、刷新取消请求、refreshDeps
  // run 表示手动来执行请求的请求发送
  // refresh 使用上一次的params，重新执行service
  // cancel 取消请求
  const { data, loading, run, refresh, cancel } = useRequest(() => queryUserList({
    current: current,
    pageSize: 10
  }), {
    // 手动触发请求
    manual: true,
    // refreshDeps: 当current改变触发请求重新执行(非手动触发的情况下生效)
    // refreshDeps: [current]
  });

  return (
    <div>
      <p>当前页码:{current}</p>
      <h3 className={styles.title}>
        {JSON.stringify(data)}
      </h3>
      <button onClick={() => run()}>点我发送请求</button>
      <button onClick={() => refresh()}>刷新请求</button>
      <button onClick={() => setCurrent(current + 1)}>点我页面+1</button>
      <button onClick={() => cancel()}>取消请求</button>
    </div>
  );
}
