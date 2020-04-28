import React from 'react'

export default function messageBox() {

    const styles = {
        backgroundColor: 'papayawhip',
        color: '#fd9d20',
        fontWeight: '1.5em',
        fontFamily: 'Courier New, Courier, monospace',
    }

    return (
        <p style={styles}>
            Select any two currencies from the dropdown to check their exchange rates. Input a non-negative amount to get its converted value. Select a date from the calendar to check historical exchange rates. Have fun! :)
        </p>
    )
}
