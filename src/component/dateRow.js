import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { InputGroup, Badge } from 'react-bootstrap'

// This component is the row of choosing dates.
export default function dateRow(props) {

const {
  prependText,
  date,
  onChangeDate
} = props;
  
const badgeStyle = {
  color: 'black',
  backgroundColor: '#fd9d20',
  marginRight: '2px',
  fontFamily: 'Courier New, Courier, monospace',
}

return (
  <InputGroup>
    <Badge pill variant="info" style={badgeStyle}>{prependText}</Badge>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={date}
        onChange={onChangeDate}
        value={date}
        filterDate = {(date) => {
          return moment() > date;
          }}
        />
    </InputGroup>    
  )
}
