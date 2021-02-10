import React, { useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';
import { queryCarRentalRecords, takeCar, returnCar } from '../pages/TableList/service';
import moment from 'moment';

const formatDate = (date) => {
  return date.slice(0, date.indexOf('T'));
};

const statusText = { 0: 'Reserved', 1: 'Using', 2: 'Finished' };

export default () => {
  const actionRef = useRef();
  const handleCar = (id, type) => {
    const result = type === 'take' ? takeCar(id) : returnCar(id);
    result.then((res) => {
      if (res.code === '0000') {
        actionRef.current.reload();
      } else {
        message.error(res.msg);
      }
    });
  };

  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Brand Name',
      dataIndex: 'brandName',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      hideInSearch: true,
    },
    {
      title: 'Renter',
      dataIndex: 'userName',
      hideInSearch: true,
      width: 80,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      hideInSearch: true,
      width: 120,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      renderText: (text) => statusText[text],
      hideInSearch: true,
      width: 120,
    },
    {
      title: 'Rent Time',
      dataIndex: 'rentTime',
      renderText: (text, record) => {
        return `From ${formatDate(record.rentTime)} to ${formatDate(record.returnTime)}`;
      },
      hideInSearch: true,
      width: 300,
    },
    {
      title: 'Rent Time',
      key: 'rentTime',
      hideInTable: true,
      dataIndex: 'rentTime',
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          const dateFormat = 'YYYY-MM-DD';
          const formatTime = {
            rentTime: `${moment(value[0]).format(dateFormat)} 00:00:00`,
            returnTime: `${moment(value[1]).format(dateFormat)} 23:59:59`,
          };

          return formatTime;
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'x',
      valueType: 'option',
      render: (_, record) => {
        return (
          (record.status === 0 && (
            <a key="instock" onClick={() => handleCar(record.id, 'take')}>
              Take car
            </a>
          )) ||
          (record.status === 1 && (
            <a key="return" onClick={() => handleCar(record.id, 'return')}>
              Return car
            </a>
          ))
        );
      },
      width: 120,
    },
  ];

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      request={queryCarRentalRecords}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="Car Rental Records"
    />
  );
};
