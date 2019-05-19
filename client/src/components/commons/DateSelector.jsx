import React from "react";
import InputGroup from "./InputGroup";
import Select from "./Select";

export default function DateSelector({ date: dateObj, onChange, label }) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const date = dateObj.getDate();

  const lastDateOfMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  lastDateOfMonth[1] = (year - 2016) % 4 === 0 ? 29 : 28;

  const minYear = new Date().getFullYear();

  return (
    <InputGroup label={label} inputId="due-date">
      <div className="date-selector">
        <div className="selector-year">
          <Select
            name="year"
            id="due-year"
            onChange={onChange}
            value={year}
            options={_.range(minYear, minYear + 10, 1)}
          />
          <label htmlFor="due-year">년</label>
        </div>
        <div className="selector-month">
          <Select
            name="month"
            id="due-month"
            onChange={onChange}
            value={month+1}
            options={_.range(1, 13, 1)}
          />
          <label htmlFor="due-month">월</label>
        </div>
        <div className="selector-date">
          <Select
            name="date"
            id="due-date"
            onChange={onChange}
            value={date}
            options={_.range(1, lastDateOfMonth[month] + 1, 1)}
          />

          <label htmlFor="due-date">일</label>
        </div>
      </div>
    </InputGroup>
  );
}
