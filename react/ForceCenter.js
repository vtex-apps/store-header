import React from 'react'
import { generateBlockClass } from '@vtex/css-handles'
import styles from './components/ForceCenter.css'

const ForceCenter = ({ children, blockClass }) => (
  <div
    className={generateBlockClass(
      `${generateBlockClass(
        styles.forceCenter,
        blockClass
      )} absolute left-0 right-0 flex justify-center z-1`
    )}
    style={{ pointerEvents: 'none' }}
  >
    <div style={{ pointerEvents: 'all' }}>{children}</div>
  </div>
)

export default ForceCenter
