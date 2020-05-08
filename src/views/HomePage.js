import React from 'react'
import styled from 'styled-components'

import SearchLocation from '../components/SearchLocation'
import WeatherContainer from '../components/WeatherContainer'
import { WeatherProvider } from '../components/WeatherContext'

const SearchContainer = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
        0px 4px 5px 0px rgba(0,0,0,0.14),
        0px 1px 10px 0px rgba(0,0,0,0.12);
    background: #2196f3;
`

const HomePage = () => {
    return(
        <React.Fragment>
            <WeatherProvider>
                <SearchContainer>
                    <SearchLocation />
                </SearchContainer>
                <WeatherContainer />
            </WeatherProvider>
        </React.Fragment>
    )
}

export default HomePage