import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

const styles = {
    padding: '0.2em',
    background: 'papayawhip',
    width: '100%',
  }
export default function header() {
    return (
        <Jumbotron fluid style={styles}>
            <h1>
                Currency Converter
            </h1>
        </Jumbotron>
    )
}
