import React from 'react'
import { render } from '@testing-library/react'
import SearchLocation from '../../components/SearchLocation'

test('renders search input with place holder', () => {
    const { queryByPlaceholderText } = render(<SearchLocation/>)
    expect(queryByPlaceholderText('Search location')).toBeTruthy()
})
