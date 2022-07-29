import React from 'react';
import styles from './index.less';
import { connect } from '@umijs/max';

function Page({user}) {
  return (
    <div>
      <h1 className={styles.title}>Docs Page index</h1>
      <div>
        {JSON.stringify(user)}
      </div>
    </div>
  );
}

export default connect(({ user, loading }) => ({
  user,
  //表示user这个model有数据请求行为的时候，loading为true，没有请求的时候为false
  loading: loading.models.user,
}))(Page);