import React, { Component, PropTypes } from 'react';
import { loadEntries } from '../../actions/instagramActions';
import { ERROR_STATE, LOADING_STATE, READY_STATE } from './InstagramContainer.constants';
import Instagram from './Instagram';

class InstagramContainer extends Component {
  state = {
    currentState: LOADING_STATE,
    entries: [],
    hashtag: null,
    profileUrl: null,
  }
  componentDidMount() {
    const { entriesLimit, isVisible } = this.props;

    if (!isVisible) return;

    loadEntries(entriesLimit)
      .then((data) => {
        const username = data.username;
        const newState = {
          currentState: READY_STATE,
          entries: data.images,
          hashtag: username ? '@' + username : null,
          profileUrl: username ? 'https://www.instagram.com/' + username : null,
        };

        this.setState(newState);
      })
      .fail(() => {
        this.setState({
          currentState: ERROR_STATE,
        });
      });
  }
  render() {
    const { currentState } = this.state;
    const { isVisible } = this.props

    if (isVisible) {
      return (
        <Instagram
          {...this.state}
          isError={currentState === ERROR_STATE}
          isLoading={currentState === LOADING_STATE}
        />
      );
    }

    return null;
  }
}

InstagramContainer.propTypes = {
  entriesLimit: PropTypes.number,
  isVisible: PropTypes.bool.isRequired
};
InstagramContainer.defaultProps = {
  entriesLimit: 10
};

export default InstagramContainer;
