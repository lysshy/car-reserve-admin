import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import styles from './index.less';
import ChooseCar from './ChooseCar';
import Information from './Information';
import ResultPage from './ResultPage';
import { reserveCar } from './service';

const { Step } = Steps;

const Reserve = (props) => {
  const [current, setCurrent] = useState(0);
  const [carInfo, setCarInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [orderId, setOrderId] = useState('');

  const next = async () => {
    if (current === 1) {
      const result = await reserveCar({ ...carInfo, ...userInfo });
      if (result.msg === 'success') {
        setOrderId(result.data);
        message.success('Reserve Success!');
        setCurrent(current + 1);
      } else {
        message.error(result.msg);
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const backToReserve = () => {
    setCurrent(0);
  };

  const steps = [
    {
      title: 'First Step',
      content: <ChooseCar reserveInfo={(info) => setCarInfo(info)} />,
    },
    {
      title: 'Information',
      content: <Information userInfo={(info) => setUserInfo(info)} />,
    },
    {
      title: 'Status',
      content: <ResultPage orderId={orderId} backToReserve={backToReserve} />,
    },
  ];

  return (
    <div className={styles.container}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            disabled={
              (current === 0 && !carInfo.brandType) || (current === 1 && !userInfo.userName)
            }
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && current !== 2 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default Reserve;
