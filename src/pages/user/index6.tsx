import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'

export default function Page() {
  //SWR
  const { data, loading } = useRequest(() => queryUserList({
    current: 1,
    pageSize: 10
  }), {
    // cacheKey应该是全局唯一的
    cacheKey: "userListKey"
  });
  console.log(data, loading)

  // 第一次请求才需要loading，后面的请求都会先从缓存中获取数据，同时向服务器发送请求，知道服务器返回数据之后，再用服务器返回的数据来替换之前页面缓存的数据
  if (!data && loading) {
    return <p>loading...........</p>;
  }
  return (
    <>
      {JSON.stringify(data)}
    </>
  );
}
