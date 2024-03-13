import { useState } from 'react';
import {
  calculateDaysInMonth,
  calculateStartDayOfMonth
} from '../utilities/dates';

export default function Calendar() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = calculateDaysInMonth(selectedYear, selectedMonth);
  const startDay = calculateStartDayOfMonth(selectedYear, selectedMonth);

  const daysArray = Array.from({ length: days }, (_, index) => index + 1);

  const emptyCellsArray = Array.from({ length: startDay }, () => null);

  const calendarArray = [...emptyCellsArray, ...daysArray];

  const years = Array.from({ length: 11 }, (_, index) => 2023 + index)
  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index.toString(),
    label: new Date(2000, index).toLocaleString('default', { month: 'long' }),
  }));

  return (
    <section>
      <h1 className="month text-2xl text-center my-8">Calendar: Month View</h1>

      <div className="calendar-header flex justify-between items-baseline px-4">

        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map(({value, label}) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>

        <div className="grid-container">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-sm">
                {day}
              </div>
            ))}
            {calendarArray.map((day, index) => (
              <div data-testid="day" key={index} className={`grid-cell ${day ? '' : 'empty'}`}>
                {day}
              </div>
            ))}
        </div>

      </div>

    </section>
  );
}
