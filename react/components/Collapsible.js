import React from 'react'
import { number } from 'prop-types'
import { withRuntimeContext } from 'vtex.render-runtime'
import { Border } from './Helpers';

const Collapsible = ({
    children,
    top,
    leanMode,
    runtime: { hints: desktop } 
}) => (
    desktop && !leanMode ? (
        <div className="relative z-2 bg-base bb bw1 b--muted-4" style={{ top: top }}>
            { children }
        </div>
    ):(
        <Border fixed top={top} />
    )
)

Collapsible.defaultProps = {
    top: 0
}

Collapsible.propTypes = {
    top: number
}

export  default withRuntimeContext(Collapsible)