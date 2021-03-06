import React from 'react'
import { bond, Card, S } from './qd'
import { cards } from './layout'

export const
  View = bond(({ name, state, changed }: Card<Record<S, unknown>>) => {
    const
      render = () => (
        <div data-test={name}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      )
    return { render, changed }
  })

cards.register('', View)