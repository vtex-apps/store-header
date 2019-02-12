import React, { Component } from 'react'
import { CONSTANTS } from './Helpers';

/**
 * HOC to that generates a component capable of toggle animations
 * @param {*} anchor // Scroll value that marks the animations switch
 * @param {*} reverse // If should animate on scrollUp
 * @param {*} speed // Animation speed
 * @param {*} onScrollDown // Animation on scroll down
 * @param {*} onScrollUp  // Animation on scroll up
 */
const withScrollAnimation = (
  anchor = CONSTANTS.SCROLL_ANIMATION.ANCHOR,
  reverse = CONSTANTS.SCROLL_ANIMATION.REVERSE,
  speed = CONSTANTS.SCROLL_ANIMATION.SPEED,
  onScrollDown = CONSTANTS.SCROLL_ANIMATION.ON_SCROLL_DOWN,
  onScrollUp = CONSTANTS.SCROLL_ANIMATION.ON_SCROLL_UP,
) => (WrappedComponent) => (
  class AnimatedOnScroll extends Component {
    
    animation = `animated ${speed} ${onScrollDown}`
    reverseAnimation = `animated ${speed} ${onScrollUp}`

    state = {
      animation: '',
      lastScrollPos: 0,
      trigger: false
    }
    
    componentDidMount() {
      document.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', this.handleScroll)
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.state.trigger 
    }

    animate(scroll) {
      const scrollingUp = this.state.lastScrollPos > scroll
      const scrollingDown = this.state.lastScrollPos < scroll

      scrollingUp && this.setState({
        animation: this.reverseAnimation,
        lastScrollPos: scroll
      })

      scrollingDown && this.setState({
        animation: this.animation,
        lastScrollPos: scroll
      })
    }

    handleScroll = () => {
      const scroll = window.scrollY
      const shouldAnimate = scroll >= anchor && !reverse
      this.setState({ trigger: shouldAnimate })
      shouldAnimate && this.animate(scroll)
    }

    render() {
      return (
        <WrappedComponent 
          {...this.props}
          animation={this.state.animation}
        />
      );
    }
  }
)

export default withScrollAnimation