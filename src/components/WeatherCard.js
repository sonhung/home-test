import React from 'react'
import styled from 'styled-components'
import { string, number } from 'prop-types'

import { dateInWeek } from '../constants'

const Card = styled.div`
    width: 100%;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    text-align: center;
    padding: 30px 0;
    margin: 20px;
    @media (max-width: 900px) {
        margin: 10px;
    }
    @media (max-width: 665px) {
        width: auto;
    }
`

const Day= styled.div`
    font-weight: bold;
    margin-bottom: 10px;
`

const Temperature = styled.div`
`

const WeatherCard = props => {
    const {
        applicable_date,
        max_temp,
        min_temp,
    } = props

    const day = new Date(applicable_date).getDay()
    return(
        <Card>
            <Day>{dateInWeek[day]}</Day>
            <Temperature>H: {max_temp.toFixed(2)}°C</Temperature>
            <Temperature>L: {min_temp.toFixed(2)}°C</Temperature>
        </Card>
    )
}

WeatherCard.propTypes = {
    applicable_date: string,
    max_temp: number,
    min_temp: number
}

export default WeatherCard