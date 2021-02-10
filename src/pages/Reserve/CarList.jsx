import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Brand Name',
    dataIndex: 'brandName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
  },
  {
    title: 'Price',
    dataIndex: 'rentPrice',
  },
];

const CarList = (props) => {
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      props.selectedId(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.brandName === null,
      name: record.brandName,
    }),
  };
  return (
    <div>
      <Table
        key="brandName"
        rowKey="brandType"
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={props.data || []}
      />
    </div>
  );
};

export default CarList;
