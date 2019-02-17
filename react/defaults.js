import PropTypes from 'prop-types'

export const logo = {
  propTypes: {
    /** Address opened when the user clicks the logo */
    linkUrl: PropTypes.string,
    /** URL of the logo image */
    logoUrl: PropTypes.string,
    /** Alt text for the logo */
    logoTitle: PropTypes.string,
    /** Size of the logo */
    logoSize: PropTypes.shape({
      /** Size on desktop */
      desktop: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
      /** Size on mobile */
      mobile: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
  },
  defaultProps: {
    linkUrl: '/',
    logoUrl: '',
    logoTitle: '',
    logoSize: {
      desktop: {
        width: 132,
        height: 40,
      },
      mobile: {
        width: 90,
        height: 40,
      },
    },
  },
}

export const collapsible = {
  propTypes: {
    collapsibleAnimation: PropTypes.shape({
      /** If should animate on scroll */
      onScroll: PropTypes.bool,
      /** If should animate on every scroll up or  down */
      always: PropTypes.bool,
      /** Scroll value that animation starts to be active */
      anchor: PropTypes.number,
      /** Initial height */
      from: PropTypes.number,
      /** Target height */
      to: PropTypes.number,
      /** Animation configuration presets: know more @ https://www.react-spring.io/docs/hooks/api */
      preset: PropTypes.oneOf([
        'default',
        'gentle',
        'wobbly',
        'stiff',
        'slow',
        'molasses',
      ]),
      /** Animation configuration: know more @ https://www.react-spring.io/docs/hooks/api */
      config: PropTypes.shape({
        mass: PropTypes.number,
        tension: PropTypes.number,
        friction: PropTypes.number,
        clamp: PropTypes.bool,
        precision: PropTypes.number,
        velocity: PropTypes.number,
        duration: PropTypes.number,
        easing: PropTypes.func,
      }),
    }),
  },

  defaultProps: {
    collapsibleAnimation: {
      onScroll: true,
      always: true,
      anchor: 100,
      from: 64,
      to: 0,
      preset: 'default',
      config: {},
    },
  },
}
