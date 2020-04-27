import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

const jumbotronStyles = {
    padding: '0.2em',
    background: '#fd9d20',
    width: '100%',
  }

const headerStyles = {
    color: 'black',
    fontFamily: 'Courier New, Courier, monospace',
}
export default function header() {
    return (
        <Jumbotron fluid style={jumbotronStyles}>
            <h1 style={headerStyles}>
                Currency Converter
            </h1>
        </Jumbotron>
    )
}
