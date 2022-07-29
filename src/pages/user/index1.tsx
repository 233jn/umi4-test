import React from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList } from '@/services/user'

export default function Page() {
  // 1. useRequest的基本使用
  // data表示服务器返回的数据
  // loading表示当前请求的状态 (loading的初始状态是true，只要请求在处理过程中都为true，直接请求结束状态为false)
  // error请求出错的错误信息
  const { data, error, loading } = useRequest(() => queryUserList({
    current: 1,
    pageSize: 10
  }), {
    // 可以延迟 loading 变成 true 的时间，有效防止闪烁
    // loadingDelay: 200,
  });
  console.log(data, loading)

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
