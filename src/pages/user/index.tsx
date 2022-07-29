import React, { useState, useEffect } from 'react';
import { connect } from '@umijs/max';
import { Table, Button, Pagination } from 'antd';

function Page({ user, loading, loadingList, dispatch }) {
  // 从dva model中的user中解构出list  total  current数据
  const { list, total, current } = user;
  // 每页显示的条数
  const [pageSize, setPageSize] = useState(10)

  // 组件挂载完毕，触发dva model的effect的执行，在effect发送请求，获取数据，保存到dva model的state中
  useEffect(() => {
    dispatch({
      type: "user/fetchUserList",
      payload: {
        current: 1,
        pageSize: pageSize
      }
    })
  }, [])

  //每当用户点击了切换页码 / 切换每页显示条数的执行
  function onChangeUserPagination(current: number, size: number) {
    // 修改每页显示的条数，并且根据当前页码和每页显示条数重新发送请求
    setPageSize(size)
    dispatch({
      type: 'user/fetchUserList',
      payload: {
        current: current,
        pageSize: size
      },
    });
  }

  const delById = (id: string) => {
    dispatch({
      type: 'user/removeUserById',
      payload: {
        id: id,
        current: current,
        pageSize: pageSize
      },
    });
  }

  // ant design的table表格的列的配置
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '个人网站',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: '操作',
      key: 'operation',
      render: (item: any) => (
        <span>
          <Button>编辑</Button>
          <Button onClick={() => delById(item.id)} > 删除</Button>
        </span >
      ),
    },
  ];

  return (
    <div>
      <div>
        <Table
          loading={loadingList}  //表格的加载状态
          columns={columns}  //表格列信息
          dataSource={list}  //表格数据源
          rowKey={(record: any) => record.id}  //表格每一行数据的key
          pagination={false}   //不显示表格默认的分页器
        />
        <Pagination
          className="ant-table-pagination"
          total={total} // 数据总数
          current={current} // 当前页数
          onChange={onChangeUserPagination}  //改变页码的点击事件
          pageSize={pageSize}   //每一页的数量
        />
      </div>
    </div>
  );
}

export default connect(({ user, loading }) => ({
  user,
  //表示user这个model有数据请求行为的时候，loading为true，没有请求的时候为false
  loading: loading.models.user,
  //当use的effects中的fetchUserList有异步请求行为时为true，没有请求行为时为false
  loadingList: loading.effects['user/fetchUserList']
}))(Page);