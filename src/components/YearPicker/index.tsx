import React, { FC } from 'react';
import styles from './styles.module.css';

interface Props {
  year: number;
  tempYear: number;
  handleCalendarClick: (date: Date) => void;
}

const YearPicker: FC<Props> = ({ year, tempYear, handleCalendarClick }) => {
  const getYearList = () => {
    const from = Math.floor(tempYear / 10) * 10,
      to = from + 9;
    const list = [];
    for (let i = from - 1; i <= to + 1; i++) {
      list.push(
        <button
          disabled={i < 100 || !(from <= i && i <= to)}
          key={i}
          className={`${i >= 100 && from <= i && i <= to ? '' : 'disabled'}
            ${i === year ? 'selected' : ''} `}
          onClick={() => handleCalendarClick(new Date(String(i)))}
        >
          {i}
        </button>
      );
    }
    return list;
  };
  return <div className={styles.container}>{getYearList()}</div>;
};

export default YearPicker;
