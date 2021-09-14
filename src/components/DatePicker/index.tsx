import React, { FC } from 'react';
import { Days, TDay, TMonth } from '@/libs/dict';
import styles from './styles.module.css';
interface Props {
  year: number;
  month: TMonth;
  date: number;
  tempYear: number;
  tempMonth: TMonth;
  handleCalendarClick: (date: Date) => void;
}

const DatePicker: FC<Props> = ({
  year,
  month,
  date,
  tempYear,
  tempMonth,
  handleCalendarClick,
}) => {
  const isDisabled = (date: Date) => {
    return date.getFullYear() !== tempYear || date.getMonth() !== tempMonth;
  };
  const getDayList = () => {
    const list = Object.keys(Days).map((v) => +v) as TDay[];
    return list.map((v) => <b key={Days[v]}>{Days[v]}</b>);
  };
  const getDateList = () => {
    const diffDay = new Date(tempYear, tempMonth).getDay();
    const dateList = [];
    for (let i = 1; i <= 42; i++) {
      dateList.push(new Date(tempYear, tempMonth, -diffDay + i));
    }
    return dateList.map((v) => (
      <button
        disabled={isDisabled(v)}
        onClick={() => handleCalendarClick(v)}
        key={`${v.getMonth()}-${v.getDate()}`}
        className={`${
          v.toDateString() === new Date().toDateString() ? styles.today : ''
        }
        ${
          date &&
          (month as number) !== -1 &&
          year >= 100 &&
          v.toDateString() === new Date(year, month, date).toDateString()
            ? 'selected'
            : ''
        }
        ${isDisabled(v) ? 'disabled' : ''}`}
      >
        {v.getDate()}
      </button>
    ));
  };
  return (
    <div className={styles.container}>
      {getDayList()}
      {getDateList()}
    </div>
  );
};

export default DatePicker;
