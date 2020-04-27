import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { FormControl, InputGroup, Badge } from 'react-bootstrap'

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
      <div>
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
      </div>    
    )
}
