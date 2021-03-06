import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { XToggle, Toggle } from './toggle'
import * as T from './qd'
import { initializeIcons } from '@fluentui/react'

const name = 'toggle'
const toggleProps: Toggle = { name }

describe('Toggle.tsx', () => {
  beforeAll(() => initializeIcons())
  beforeEach(() => {
    jest.clearAllMocks()
    T.qd.args[name] = null
  })

  it('Renders data-test attr', () => {
    const { queryByTestId } = render(<XToggle model={toggleProps} />)
    expect(queryByTestId(name)).toBeInTheDocument()
  })

  it('Does not display toggle when visible is false', () => {
    const { queryByTestId } = render(<XToggle model={{ ...toggleProps, visible: false }} />)
    expect(queryByTestId(name)).toBeInTheDocument()
    expect(queryByTestId(name)).not.toBeVisible()
  })

  it('Calls sync when trigger is on', () => {
    const syncMock = jest.fn()
    const { getByTestId } = render(<XToggle model={{ ...toggleProps, trigger: true }} />)

    T.qd.sync = syncMock
    fireEvent.click(getByTestId(name))

    expect(syncMock).toHaveBeenCalled()
  })

  it('Does not call sync when trigger is off', () => {
    const syncMock = jest.fn()
    const { getByTestId } = render(<XToggle model={toggleProps} />)

    T.qd.sync = syncMock
    fireEvent.click(getByTestId(name))

    expect(syncMock).toHaveBeenCalledTimes(0)
  })

  it('Sets args on click', () => {
    const { getByTestId } = render(<XToggle model={toggleProps} />)
    fireEvent.click(getByTestId(name))

    expect(T.qd.args[name]).toBe(true)
  })

})