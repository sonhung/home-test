import React, { Component } from 'react'
import { any } from 'prop-types'
import slice from 'lodash/slice'

import { makeGetRequest } from '../utils/makeRequest'
import { searchUrl , locationUrl} from '../constants/router'

const baseUrl = 'http://localhost:3001'

const WeatherContext = React.createContext()

class WeatherProvider extends Component {
  state = {
    searchList: [],
    weatherInfo: [],
    loading: false,
    cityName: ''
  }

  searchLocation = async query => {
    const { data: searchList = [] } = await makeGetRequest(`${baseUrl}${searchUrl}`, { query })
    this.setState({ searchList })
  }

  getWeather = async location => {
    this.setState({ loading: true })
    const { woeid } = location
    const {
      data: {
        consolidated_weather = [],
        title = '',
        location_type = ''
      } = {}
    } = await makeGetRequest(`${baseUrl}${locationUrl}`, { woeid })
    const weatherInfo = slice(consolidated_weather, 0, 5)
    const cityName = `${title} ${location_type}`
    this.setState({ weatherInfo, cityName, loading: false })
  }

  render() {
    return (
      <WeatherContext.Provider
        value={{
          ...this.state,
          searchLocation: this.searchLocation,
          getWeather: this.getWeather
        }}
      >
        {this.props.children}
      </WeatherContext.Provider>
    )
  }
}

WeatherProvider.propTypes = {
  children: any,
}

const WeatherConsumer = WeatherContext.Consumer

export default WeatherContext
export { WeatherConsumer, WeatherProvider }