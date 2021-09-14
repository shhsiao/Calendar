import { TMonth } from '@/libs/dict';
import React, { FC } from 'react';
import styles from './styles.module.css';
import { getFormatYear, getFormatMonth, getFormatDate } from '@/libs/utils';

interface Props {
  year: number;
  month: TMonth;
  date: number;
  isOpenPicker: boolean;
  handlePickerOpen: (open: boolean) => void;
  handleInputChange: ({
    field,
    value,
  }: {
    field: 'year' | 'month' | 'date';
    value: number;
  }) => void;
}

const DateInput: FC<Props> = ({
  year,
  month,
  date,
  isOpenPicker,
  handlePickerOpen,
  handleInputChange,
}) => {
  return (
    <div
      className={`${styles.container} ${isOpenPicker ? styles.open : ''}`}
      onClick={() => handlePickerOpen(true)}
    >
      <img
        src="https://img.icons8.com/ios/50/000000/calendar--v1.png"
        width="30"
        height="30"
      />
      <input
        className={`${styles.year}`}
        type="number"
        min="100"
        onChange={(e) =>
          e.currentTarget.value.length < 6 &&
          handleInputChange({ field: 'year', value: +e.currentTarget.value })
        }
        value={getFormatYear(year)}
      />
      <div className={styles.dash}> - </div>
      <input
        type="number"
        min="1"
        onChange={(e) =>
          handleInputChange({
            field: 'month',
            value: (+e.currentTarget.value - 1) as TMonth,
          })
        }
        value={getFormatMonth(month)}
      />
      <div className={styles.dash}> - </div>
      <input
        type="number"
        min="1"
        onChange={(e) =>
          handleInputChange({ field: 'date', value: +e.currentTarget.value })
        }
        value={getFormatDate(date)}
      />
    </div>
  );
};

export default DateInput;
