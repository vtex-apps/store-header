import React, { FunctionComponent } from 'react'
import StickyRow from './StickyRow'

interface Props {
  sticky: boolean
}

const Border: FunctionComponent<Props> = ({ sticky }) => (
  <StickyRow sticky={sticky}>
    <div className="bb b--muted-3" />
  </StickyRow>
)

export default Border
