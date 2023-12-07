import React from 'react'
import TrendButton from './TrendButton'
import { brandButtons } from '../util'

const BrancdButtons = () => {
  return (
    <div className='flex pb-8'>
        {brandButtons.map(btn=><TrendButton label={btn.label} key={btn.id} active={btn.active}/>)}
    </div>
  )
}

export default BrancdButtons