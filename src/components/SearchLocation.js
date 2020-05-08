import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import WeatherContext from './WeatherContext'

const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 350,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    }
}))

const SearchContainer = styled.div`
    position: relative;
`

const SearchResult = styled.div`
    position: absolute;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),
        0px 1px 1px 0px rgba(0,0,0,0.14),
        0px 1px 3px 0px rgba(0,0,0,0.12);
    width: 350px;
    max-height: 270px;
    overflow: auto;
    background: #fff;
    margin: 1px 0 0 3px;
`

const LocationItem = styled.div`
    cursor: pointer;
    padding: 7px 10px;

    &:hover {
        background: #cdcdcd;
    }
`

const Loading = styled.div`
    text-align: center;
    padding: 7px;
`

const SearchLocation = () => {
    const classes = useStyles()
    const {
        searchList = [],
        searchLocation = () => null,
        getWeather = () => null
    } = useContext(WeatherContext) || {}

    const [showSearchList, setShowSearchList] = useState(false)
    const [loading, setLoading] = useState(false)
    const queryInput = useRef(null)

    // call api search after user stop typing
    const handleOnchange = debounce(query => {
        setShowSearchList(!isEmpty(query))
        if(isEmpty(query)) return
        setLoading(true)
        searchLocation(query)
    }, 300)

    const chooseLocation = item => {
        queryInput.current.value = ''
        getWeather(item)
    }

    const onFocusSearch = () => {
        setShowSearchList(!isEmpty(queryInput.current.value))
    }

    const onBlurSearch = () => {
        // hide search list after 100ms when blur
        // to make sure user can select item in search list
        setTimeout(() => {
            setShowSearchList(false)
        }, 100)
    }

    useEffect(() => {
        setLoading(false)
    }, [searchList])

    return(
        <SearchContainer>
            <Paper component="form" className={classes.root}>
                <InputBase
                    inputRef={queryInput}
                    className={classes.input}
                    placeholder="Search location"
                    onBlur={onBlurSearch}
                    onFocus={onFocusSearch}
                    onChange={(e) => handleOnchange(e.target.value)}
                />
                <SearchIcon />
            </Paper>
            {showSearchList && <SearchResult>
                {loading && <Loading>
                    <CircularProgress size={20} thickness={5} />
                </Loading>}
                {!loading && <React.Fragment>
                    {
                        searchList.map(item => <LocationItem
                            key={item.woeid}
                            onClick={() => chooseLocation(item)}
                        >
                            {item.title}
                        </LocationItem>)
                    }
                    {isEmpty(searchList) && <LocationItem>No result</LocationItem>}
                </React.Fragment>}
            </SearchResult>}
        </SearchContainer>
    )
}

export default SearchLocation