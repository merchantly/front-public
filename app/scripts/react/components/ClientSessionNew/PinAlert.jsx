import React, { Component } from 'react'; import PropTypes from 'prop-types';

class PinAlert extends Component {
  constructor(props) {
    super(props);

    this.state = { secondsLeft: props.timeout };
    this.countdown = this.countdown.bind(this);
  }
  componentDidMount() {
    if (this.state.secondsLeft > 0) {
      this.timeoutId = window.setTimeout(this.countdown, 1000);
    }
  }
  componentWillUnmount() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }
  countdown() {
    const {
      secondsLeft,
    } = this.state;

    if (secondsLeft > 0) {
      this.setState({ secondsLeft: secondsLeft - 1 });
      this.timeoutId = window.setTimeout(this.countdown, 1000);
    }
  }
  render() {
    const {
      t,
    } = this.props;
    const {
      secondsLeft,
    } = this.state;
    const timeoutHtmlMessage = t('vendor.client.pin_alert.timeout') +
      ' ' + t('vendor.seconds_count', { count: secondsLeft });

    return (
      <p>
        {secondsLeft > 0
          ? <span dangerouslySetInnerHTML={{ __html: timeoutHtmlMessage }} />
          : (
          <span className="pin-alert-base">
            <button
              className="b-btn"
              name="send_pin_code"
              type="submit"
            >
              {t('vendor.client.pin_alert.send')}
            </button>
          </span>
          )
        }
      </p>
    );
  }
}

PinAlert.propTypes = {
  t: PropTypes.func.isRequired,
  timeout: PropTypes.number,
};

PinAlert.defaultProps = {
  timeout: 0,
};

export default PinAlert;
