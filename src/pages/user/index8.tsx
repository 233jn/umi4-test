import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'

function Page() {
  let [current, setCurrent] = useState(1);
  // data 服务器返回的数据
  // loadingMore 是否正在加载更多
  // reload 触发重新加载，清空原data数组
  // loadMore 触发加载更多，把新数据追加到data数组
  // noMore 是否有更多数据，需要配合 options.isNoMore 使用
  const { data, loadingMore, reload, loadMore, noMore } = useRequest(() => queryUserList({
    current: current,
    pageSize: 5
  }), {
    loadMore: true,
    //判断是否还有更多数据的函数
    isNoMore: (d) => {
      return (d ? d.list.length >= 15 : false)
    },
  })

  const getMore = () => {
    setCurrent(current + 1)
    current = current + 1
    loadMore();
  }

  return (
    <div>
      {JSON.stringify(data)}
      <button onClick={() => { getMore() }}>加载更多...</button>
      <button onClick={() => reload()}>点我reload</button>
      是否还有更多数据:{!noMore?"有":"没有"}
    </div>
  );
}

export default Page;