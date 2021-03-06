import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { XDatePicker, DatePicker } from './date_picker'
import * as T from './qd'
import { initializeIcons } from '@fluentui/react'

const name = 'datepicker'
const datepickerProps: DatePicker = { name }
describe('Datepicker.tsx', () => {
  beforeAll(() => initializeIcons())
  beforeEach(() => { T.qd.args[name] = null })

  it('Renders data-test attr', () => {
    const { queryByTestId } = render(<XDatePicker model={datepickerProps} />)
    expect(queryByTestId(name)).toBeInTheDocument()
  })

  it('Does not display date picker when visible is false', () => {
    const { queryByTestId } = render(<XDatePicker model={{ ...datepickerProps, visible: false }} />)
    expect(queryByTestId(name)).toBeInTheDocument()
    expect(queryByTestId(name)).not.toBeVisible()
  })

  it('Sets args - init - value not specified', () => {
    render(<XDatePicker model={datepickerProps} />)
    expect(T.qd.args[name]).toBeFalsy()
  })

  it('Sets args - init - value specified', () => {
    render(<XDatePicker model={{ ...datepickerProps, value: 'Test' }} />)
    expect(T.qd.args[name]).toBe('Test')
  })

  it('Sets args - selection', () => {
    expect(T.qd.args[name]).toBeFalsy()
    const { getAllByRole, getAllByText } = render(<XDatePicker model={datepickerProps} />)
    fireEvent.click(getAllByRole('combobox')[0])
    fireEvent.click(getAllByText('1')[0])

    expect(T.qd.args[name]).toBeTruthy()
  })

  it('Calls sync when trigger specified', () => {
    const syncMock = jest.fn()
    const { getAllByRole, getAllByText } = render(<XDatePicker model={{ ...datepickerProps, trigger: true }} />)

    T.qd.sync = syncMock
    fireEvent.click(getAllByRole('combobox')[0])
    fireEvent.click(getAllByText('1')[0])

    expect(syncMock).toHaveBeenCalled()
  })
})