import React from 'react'
import { render } from '@testing-library/react'
import WeatherCard from '../../components/WeatherCard'

test('renders day, max temp, min temp in card', () => {
    const props = {
        applicable_date: '2020-05-07',
        max_temp: 28.9434,
        min_temp: 23.43
    }
    const { queryByText } = render(<WeatherCard {...props}/>)
    expect(queryByText('Thursday')).toBeTruthy()
    expect(queryByText('H: 28.94°C')).toBeTruthy()
    expect(queryByText('L: 23.43°C')).toBeTruthy()
})
