import React, { useContext } from 'react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress';

import WeatherContext from './WeatherContext'
import WeatherCard from './WeatherCard'

const WeatherBlock = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 665px) {
        display: block;
    }
`

const CityBlock = styled.div`
    text-align: center;
    margin: 30px 0;
    color: #0d47a1;
    font-size: 20px;
`

const WeatherContainer = () => {
    const {
        weatherInfo = [],
        loading,
        cityName = ''
    } = useContext(WeatherContext)

    return(
        <React.Fragment>
            {loading && <LinearProgress />}
            {!loading && <React.Fragment>
                <CityBlock>{cityName}</CityBlock>
                <WeatherBlock>
                    {weatherInfo.map(item => <WeatherCard key={item.id} {...item} />)}
                </WeatherBlock>
            </React.Fragment>}
        </React.Fragment>
    )
}

export default WeatherContainer