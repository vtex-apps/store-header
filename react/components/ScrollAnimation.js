import React, { PureComponent } from 'react'

/**
 * HOC to that generates a component capable of toggle animations
 * @param {*} anchor // Scroll value that marks the animations switch
 * @param {*} reverse // If should animate on scrollUp
 * @param {*} speed // Animation speed
 * @param {*} onScrollDown // Animation on scroll down
 * @param {*} onScrollUp  // Animation on scroll up
 */
const withScrollAnimation = (
  
  anchor=45,
  reverse=false,
  speed='faster',
  onScrollDown='slideOutUp',
  onScrollUp='slideInDown',

) => (WrappedComponent) => (
  class AnimatedOnScroll extends PureComponent {
    
    animation = `animated ${speed} ${onScrollDown}`
    reverseAnimation = `animated ${speed} ${onScrollUp}`

    state = {
      animation: this.reverseAnimation
    }

    
    componentDidMount() {
      document.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
      document.removeEventListener('scroll', this.handleScroll)
    }

    getAnimation = scroll => {
      return scroll >= anchor && !reverse
        ? this.animation
        : this.reverseAnimation
    } 

    handleScroll = () => {
      const scroll = window.scrollY
      this.setState({
        animation: this.getAnimation(scroll)
      })
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