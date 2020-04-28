import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

// This is the component of currency input and selection.
export default function currencyRow(props) {
    const {
        currencyDescription,
        currencyOptions,
        currencyFullName,
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
            <select className="custom-select" key={currencyDescription} value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map((option, index) => (
                <option key={option + currencyDescription} value={option}>{option}({currencyFullName[index]})</option>
            ))}
            </select>            
        </InputGroup>
    )
}
