import React, { Component } from 'react'

const withScrollHandler = (WrappedComponent, scroll) => (
    class ScrollHandler extends Component {

        state = {
            scroll: 0,
        }

        componentDidMount() {
            document.addEventListener('scroll', this.handleScroll)
        }

        componentWillMount() {
            document.removeEventListener('scroll', this.handleScroll)
        }

        handleScroll = args => {
            const scroll = window.scrollY
            this.setState({
                scroll: scroll,
            })
        }
    
        render() {
            return (
                <WrappedComponent { ...this.state } {...this.props}></WrappedComponent>
            );
        }
    }
)

export default withScrollHandler;