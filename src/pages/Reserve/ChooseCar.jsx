import React, { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import CarList from './CarList';
import { queryCarList } from './service';
import styles from './index.less';

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
  return current && current < moment().startOf('day');
};

const ChooseCar = (props) => {
  const [carList, setCarList] = useState([]);
  const [rangeTime, setRangeTime] = useState({});
  const changeRange = async (value) => {
    const dateFormat = 'YYYY-MM-DD';
    const formatTime = {
      rentTime: `${moment(value[0]).format(dateFormat)} 00:00:00`,
      returnTime: `${moment(value[1]).format(dateFormat)} 23:59:59`,
    };
    const result = await queryCarList(formatTime);
    setRangeTime(formatTime);
    setCarList(result.data);
  };
  const setCarId = (id) => {
    props.reserveInfo({ ...rangeTime, brandType: id[0] });
  };

  return (
    <div className={styles.chooseCar}>
      <span className={styles.selectText}>Please select the rental date: </span>
      <RangePicker disabledDate={disabledDate} onChange={changeRange} />
      <div className={styles.carList}>
        <CarList data={carList} selectedId={setCarId} />
      </div>
    </div>
  );
};

export default ChooseCar;
