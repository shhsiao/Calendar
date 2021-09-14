import { TViewMode, TBtnClick } from '@/containers/Calendar/model';
import React, { FC } from 'react';
import styles from './styles.module.css';
import { Months, TMonth } from '@/libs/dict';

interface Props {
  viewMode: TViewMode;
  handleViewMode: () => void;
  handleBtnClick: TBtnClick;
  year: number;
  month: TMonth;
  date: number;
  tempYear: number;
  tempMonth: TMonth;
}

const CalendarHeader: FC<Props> = ({
  viewMode,
  handleViewMode,
  handleBtnClick,
  tempYear,
  tempMonth,
}) => {
  const getTempYearRange = (): { from: number; to: number } => {
    const from = Math.floor(tempYear / 10) * 10,
      to = from + 9;
    return {
      from,
      to,
    };
  };
  const showYear = () => (tempYear >= 100 ? tempYear : 'YYYY');
  return (
    <div className={styles.container}>
      <button
        className={styles.icon}
        onClick={() => handleBtnClick('previous')}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </button>
      <div className={styles.title} onClick={handleViewMode}>
        {viewMode === 'date'
          ? `${Months[tempMonth] || 'MM'}  ${showYear()}`
          : viewMode === 'month'
          ? showYear()
          : `${getTempYearRange().from} - ${getTempYearRange().to}`}
      </div>
      <button className={styles.icon} onClick={() => handleBtnClick('next')}>
        <div className={`${styles.arrow} ${styles.right}`} />
      </button>
    </div>
  );
};

export default CalendarHeader;
