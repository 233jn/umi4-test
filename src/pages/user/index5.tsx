import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'

export default function Page() {
  // 集成请求库
  // const { data, loading } = useRequest("/api/users");

  // const { data, loading } = useRequest({
  //   url: "/api/users",
  //   params: { current: 1, pageSize: 10 },
  //   method: "GET"
  // });

  const { data, loading } = useRequest({
    url: "/api/users/create",
    data: { name: "小明" },
    method: "POST"
  });


  return (
    <div>
      <h3 className={styles.title}>
        <div>
          {loading ? <div>loading...</div> : JSON.stringify(data)}
        </div>
      </h3>
    </div>
  );
}
