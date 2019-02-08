import React, { PureComponent } from 'react'

/**
 * 
 * @param {*} anchor 
 * @param {*} reverse 
 * @param {*} speed 
 * @param {*} onScrollDown 
 * @param {*} onScrollUp 
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

export default withScrollAnimation;