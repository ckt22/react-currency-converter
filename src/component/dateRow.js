import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export default function dateRow(props) {
    const {
        date,
        onChangeDate
    } = props;

    return (
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
            dateFormat="yyyy-MM-dd"
              selected={date}
              onChange={onChangeDate}
              value={date}
              filterDate = {(date) => {
                return moment() > date;
              }}
            />
          </div>
        </div>
    )
}
