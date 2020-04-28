import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { InputGroup, Button } from 'react-bootstrap'

// This component is the row of choosing dates.
export default function dateRow(props) {

const {
  prependText,
  date,
  onChangeDate
} = props;

const CalendarCustomInput = ({ value, onClick }) => (
  <Button className="example-custom-input" variant="outline-warning" onClick={onClick}>
    {value}
  </Button>
);

return (
  <InputGroup>
      <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">{prependText}</InputGroup.Text>
    </InputGroup.Prepend>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={date}
        onChange={onChangeDate}
        value={date}
        customInput={<CalendarCustomInput />}
        filterDate = {(date) => {
          return moment() > date;
          }}
        />
    </InputGroup>    
  )
}
