import React from 'react';
import { Result, Button } from 'antd';

const ResultPage = (props) => {
  return (
    <Result
      status="success"
      title="Successfully Reserved Car!"
      subTitle={`Order number: ${props.orderId}.`}
      extra={
        <Button type="primary" onClick={props.backToReserve}>
          Reserve Again
        </Button>
      }
    />
  );
};

export default ResultPage;
