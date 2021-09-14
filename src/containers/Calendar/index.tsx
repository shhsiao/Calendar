import React, { FC, useState } from 'react';
import CalendarHeader from '@/components/CalendarHeader';
import DatePicker from '@/components/DatePicker';
import MonthPicker from '@/components/MonthPicker';
import YearPicker from '@/components/YearPicker';
import DateInput from '@/components/DateInput';
import { TMonth } from '@/libs/dict';
import styles from './styles.module.css';
import { TViewMode, TBtnClick } from './model';

const Calendar: FC = () => {
  const [viewMode, setViewMode] = useState<TViewMode>('date');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<TMonth>(new Date().getMonth() as TMonth);
  const [date, setDate] = useState<number>(new Date().getDate());
  const [tempYear, setTempYear] = useState<number>(year);
  const [tempMonth, setTempMonth] = useState<TMonth>(month);
  const [isOpenPicker, setOpenPicker] = useState<boolean>(false);
  const handleViewMode = () => {
    if (viewMode === 'year') {
      return;
    }
    const newMode = viewMode === 'date' ? 'month' : 'year';
    setViewMode(newMode);
  };
  const handleBtnClick: TBtnClick = (action) => {
    switch (viewMode) {
      case 'date':
        const date = new Date(tempYear, tempMonth);
        const newDate = new Date(
          date.setMonth(
            action === 'previous' ? date.getMonth() - 1 : date.getMonth() + 1
          )
        );
        setTempYear(newDate.getFullYear());
        setTempMonth(newDate.getMonth() as TMonth);
        break;
      case 'month':
        if (action === 'previous' && tempYear - 1 >= 100) {
          setTempYear((v) => v - 1);
        } else if (action === 'next') {
          setTempYear((v) => v + 1);
        }
        break;
      case 'year':
        if (action === 'previous' && tempYear - 10 >= 100) {
          setTempYear((v) => v - 10);
        } else if (action === 'next') {
          setTempYear((v) => v + 10);
        }
        break;
    }
  };
  const handleCalendarClick = (date: Date): void => {
    const [y, m, d] = [
      date.getFullYear(),
      date.getMonth() as TMonth,
      date.getDate(),
    ];
    switch (viewMode) {
      case 'date':
        setDate(d);
        setMonth(m);
        setYear(y);
        handlePickerOpen(false);
        break;
      case 'month':
        setDate(1);
        setMonth(m);
        setTempMonth(m);
        setViewMode('date');
        break;
      case 'year':
        setYear(y);
        setMonth(0);
        setTempYear(y);
        setViewMode('month');
        break;
    }
  };
  const handlePickerOpen = (open: boolean): void => {
    setOpenPicker(open);
  };
  const handleInputChange = ({
    field,
    value,
  }: {
    field: 'year' | 'month' | 'date';
    value: number;
  }) => {
    switch (field) {
      case 'year':
        setYear(value);
        setTempYear(value);
        break;
      case 'month':
        if (value > 11) {
          value = 11;
        }
        setMonth(value as TMonth);
        setTempMonth(value as TMonth);
        break;
      case 'date':
        const maxDate = new Date(year, month + 1, 0).getDate();
        if (value > maxDate) {
          value = maxDate;
        }
        setDate(value);
        break;
    }
  };
  const showCurrentPicker = () =>
    viewMode === 'date' ? (
      <DatePicker
        year={year}
        month={month}
        date={date}
        tempYear={tempYear}
        tempMonth={tempMonth}
        handleCalendarClick={handleCalendarClick}
      />
    ) : viewMode === 'month' ? (
      <MonthPicker
        year={year}
        month={month}
        tempYear={tempYear}
        tempMonth={tempMonth}
        handleCalendarClick={handleCalendarClick}
      />
    ) : (
      <YearPicker
        year={year}
        tempYear={tempYear}
        handleCalendarClick={handleCalendarClick}
      />
    );

  return (
    <div className={styles.container}>
      <DateInput
        year={year}
        month={month}
        date={date}
        isOpenPicker={isOpenPicker}
        handleInputChange={handleInputChange}
        handlePickerOpen={handlePickerOpen}
      />
      {isOpenPicker && (
        <CalendarHeader
          viewMode={viewMode}
          handleViewMode={handleViewMode}
          handleBtnClick={handleBtnClick}
          year={year}
          month={month}
          date={date}
          tempYear={tempYear}
          tempMonth={tempMonth}
        />
      )}
      {isOpenPicker && showCurrentPicker()}
    </div>
  );
};

export default Calendar;
