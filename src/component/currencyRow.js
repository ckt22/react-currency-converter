import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

export default function currencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <InputGroup className="mb-3">
            <FormControl
                type="number"
                value={amount}
                onChange={onChangeAmount}
            >
            </FormControl>
            <select className="custom-select" value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
            </select>            
        </InputGroup>
    )
}


            {/* <input className="input" type="number" value={amount} onChange={onChangeAmount} />       */}