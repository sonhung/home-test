const axios = require('axios')

const makeGetRequest = async (res, url) => {
    try {
        const { data } = await axios.get(url)
        res.send({ data, status: 200 })
    } catch (err) {
        const {
          message = 'Request failed with status code 400',
          response: { status = 400, data: errData } = {},
        } = err
        res.send({ message, status, errData })
    }
}

const searchLocation = async (req, res) => {
    const { query: { query } = {} } = req
    const url = `https://www.metaweather.com/api/location/search?query=${query}`
    makeGetRequest(res, url)
}

const getWeather = async (req, res) => {
    const { query: { woeid } = {} } = req
    const url = `https://www.metaweather.com/api/location/${woeid}`
    makeGetRequest(res, url)
}

module.exports = {
    searchLocation,
    getWeather
}