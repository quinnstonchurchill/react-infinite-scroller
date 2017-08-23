import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function(Component) {
	class InfiniteScrollify extends Component {
		constructor(props) {
            super(props)
            this.attachScrollListener = this.attachScrollListener.bind(this)
            this.detachScrollListener = this.detachScrollListener.bind(this)
		}
		componentDidMount() {
			this.attachScrollListener()
		}
		componentWillUnmount() {
			this.detachScrollListener()
		}
		componentDidUpdate() {
			this.attachScrollListener()
		}
		attachScrollListener() {
			window.addEventListener('scroll', this.loadMore, true)
		}
		detachScrollListener() {
			window.removeEventListener('scroll', this.loadMore, true)
		}
		loadMore() {
			if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - this.props.offset)) {
				this.detachScrollListener()
				this.props.loadMore()
			}
		}
		render() {
			return <Component {...this.props} />
		}
	}

	return InfiniteScrollify
}

InfiniteScrollify.propTypes = {
    // loads more items when the bottom of the page is reached
    loadMore: PropTypes.func.isRequired,
    // offset the distance at which loadMore is called. Useful for fixed elements like navbars.
    offset: PropTypes.number
}

InfiniteScrollify.defaultProps = {
    offset: 200
}
