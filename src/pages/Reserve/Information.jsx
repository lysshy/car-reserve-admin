import React from 'react';
import { Form, Input } from 'antd';
import styles from './index.less';

const Information = (props) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (values, allValues) => {
    console.log(allValues);
    if (allValues.userName && allValues.mobile) {
      props.userInfo(allValues);
    }
  };

  return (
    <Form
      className={styles.infoForm}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your userName!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mobile"
        name="mobile"
        rules={[
          {
            required: true,
            message: 'Please input your mobile number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Information;
