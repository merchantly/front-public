import React, { Component, PropTypes } from 'react';
import CheckoutFieldSelect from './CheckoutFieldSelect';
import * as apiRoutes from '../../../routes/api';
import provideTranslations from 'rc/HoC/provideTranslations';
import { diff } from 'deep-diff';

const DEFAULT_STATE = 'default';
const REQUIRED_STATE = 'required';
const LOADING_STATE = 'loading';
const LOADED_STATE = 'loaded';
const ERROR_STATE = 'error';

class CheckoutFieldSelectAjax extends Component {
  state = {
    status: DEFAULT_STATE,
    items: []
  }
  componentDidMount() {
    this.loadItems({requestData: this.props.requestData})
  }
  //shouldComponentUpdate(nextProps, nextState) {
    //if (this.state.status != nextState.status || this.state.items != nextState.items) {
      //return true;
    //}
    //console.log('shouldComponentUpdate', diff(nextProps.requestData, this.props.requestData));
    //return !!diff(nextProps.requestData, this.props.requestData);
  //}
  componentWillReceiveProps(nextProps) {
    if (diff(nextProps.requestData, this.props.requestData)) this.loadItems({requestData: nextProps.requestData});
  }
  loadItems({requestData}) {
    // if belongsRequired exists makeRequest
    // else setState required
    this.makeRequest({requestData})
      .then((data) => {
        this.setState({
          items: data,
          status: LOADED_STATE
        })
      })
      .fail((xhr, textStatus) => {
        if (textStatus !== 'abort') {
          this.setState({
            status: ERROR_STATE
          })
        }
      });
  }

  makeRequest({requestData}) {
    if (this.pendingRequest) this.pendingRequest.abort();

    const {
      collectionUrl
    } = this.props;

    // Добыть данные

    this.setState({
      status: LOADING_STATE
    });

    console.log("makeRequest", collectionUrl, requestData);

    this.pendingRequest = $.ajax({
      url: apiRoutes.publicUrl() + collectionUrl,
      type: 'GET',
      data: requestData
    });

    return this.pendingRequest;
}

render() {
  const {
    id,
    title,
    name,
    itemName,
    onChange,
    errorMessage,
    defaultTitle,
    value,
    disabled,
    t
  } = this.props;

  const {
    status,
    items,
    requiredTitle
  } = this.state;

  switch(status) {
    case DEFAULT_STATE:
      case LOADING_STATE:
      return (<div>{t('vendor.ajax.loading')}</div>);
    case REQUIRED_STATE:
      return (<div>{requiredTitle}</div>);
    case LOADED_STATE:
      return (
        <CheckoutFieldSelect
          title={title}
          disabled={disabled}
          defaultTitle={defaultTitle}
          id={id}
          itemName={itemName}
          name={name}
          value={value}
          items={items}
          onChange={onChange}
          errorMessage={errorMessage}
        />
    );
    case ERROR_STATE:
      return (<div>{t('vendor.ajax.error')}</div>);
    default:
      return (<div>Unknown status {status}</div>)
  }
}
}

CheckoutFieldSelectAjax.propTypes = {
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

CheckoutFieldSelectAjax.defaultProps = {
};

export default provideTranslations(CheckoutFieldSelectAjax);
