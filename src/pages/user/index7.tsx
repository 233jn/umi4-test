import React, { useState } from 'react';
import styles from './index.less';
import { useRequest } from '@umijs/max';
import { queryUserList, queryUserById } from '@/services/user'
import { Table, Button } from 'antd';

function Page() {
  //tableProps 表格属性,包含: dataSource: Array(5), loading: false, pagination: {…}, onChange
  //params 表示信息，包含:current: 3  filters: {}  pageSize: 5  sorter:{column: {…}, order: 'descend', field: 'id', columnKey: undefined}
  //refresh 刷新请求的方法
  const { tableProps, params, refresh } = useRequest(
    ({ current, pageSize, sorter: s }) => {
      //p 请求参数
      const p: any = { current, pageSize };
      //s:排序信息
      if (s?.field && s?.order) {
        p[s.field] = s.order;
      }
      return queryUserList(p);
    },
    {
      //开启分页
      paginated: true,
      //每页默认显示数量
      defaultPageSize: 5,
    },
  );

  // 获取params中的排序和过滤信息
  const { sorter = {}, filters = {} } = params[0] || ({} as any);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,  //支持id排序
      sortOrder: sorter.field === 'id' ? sorter.order : false,
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'website',
      dataIndex: 'website'
    },
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>
        Refresh
      </Button>
      <Table columns={columns} rowKey="id" {...tableProps as any} />
    </div>
  );
}

export default Page;