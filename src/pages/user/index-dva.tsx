import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'
import { connect } from '@umijs/max';

function Page({ user, loading, dispatch }) {
  //在组件中发送请求，获取到数据之后，通过dispatch一个reducer来把数据保存到dva model中
  const { data } = useRequest(() => queryUserList({
    current: 1,
    pageSize: 5
  }))

  useEffect(() => {
    if(!data) return;
    dispatch({
      type: "user/save",
      payload: data
    })
  }, [data])

  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}

export default connect(({ user, loading }) => ({
  user,
  //表示user这个model有数据请求行为的时候，loading为true，没有请求的时候为false
  loading: loading.models.user,
}))(Page);