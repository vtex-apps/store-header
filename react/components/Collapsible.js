import React from 'react'
import { number } from 'prop-types'

const Collapsible = ({ children, top }) => (
    <div className="relative z-2 bg-base" style={{ top: top }}>
        { children }
    </div>
)

Collapsible.defaultProps = {
    top: 0
}

Collapsible.propTypes = {
    top: number
}

export  default Collapsible