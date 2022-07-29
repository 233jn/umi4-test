import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'

export default function Page() {
  // 3.请求依赖
  const { data, loading } = useRequest(() => queryUserList({
    current: 1,
    pageSize: 10
  }));

  //ready: 表示请求依赖，这边只有等到第一个请求的data有了响应之后才会执行第二个请求
  const { data: data2, loading: loading2 } = useRequest(() => queryUserById(data.list[0].id), {
    ready: !!data
  });

  return (
    <div>
      <h3 className={styles.title}>
        <div>
          {loading2 ? <div>loading...</div> : JSON.stringify(data2)}
        </div>
      </h3>
    </div>
  );
}
