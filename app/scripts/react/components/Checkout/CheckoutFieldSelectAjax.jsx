import React, { Component, PropTypes } from 'react';
import CheckoutFieldSelect from './CheckoutFieldSelect';
import * as apiRoutes from '../../../routes/api';
import provideTranslations from 'rc/HoC/provideTranslations';
import { diff } from 'deep-diff';
import { find } from 'lodash';

const DEFAULT_STATE = 'default';
const REQUIRED_STATE = 'required';
const LOADING_STATE = 'loading';
const LOADED_STATE = 'loaded';
const ERROR_STATE = 'error';

const findEmptyValue = (requires, data) => {
  return find(requires || [], (v) => !data[v]);
}

class CheckoutFieldSelectAjax extends Component {
  state = {
    status: DEFAULT_STATE,
    items: []
  }
  componentDidMount() {
    this.loadItems(this.props.requestData)
  }
  //shouldComponentUpdate(nextProps, nextState) {
    //if (this.state.status != nextState.status || this.state.items != nextState.items) {
      //return true;
    //}
    //console.log('shouldComponentUpdate', diff(nextProps.requestData, this.props.requestData));
    //return !!diff(nextProps.requestData, this.props.requestData);
  //}
  componentWillReceiveProps(nextProps) {
    if (diff(nextProps.requestData, this.props.requestData)) this.loadItems(nextProps.requestData);
  }
  loadItems(requestData) {
    if (findEmptyValue(this.props.belongs, requestData)) {
      this.setState({status: REQUIRED_STATE});
    } else {
      this.makeRequest({requestData})
      .done((data) => {
        if (Array.isArray(data)) {
          this.setState({
            items: data,
            status: LOADED_STATE
          })
        } else {
          this.setState({
            status: ERROR_STATE
          });
        };
        })
        .fail((xhr, textStatus) => {
          if (textStatus !== 'abort') {
            this.setState({
              status: ERROR_STATE
            })
          }
        });
    };
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
    inputName,
    onChange,
    errorMessage,
    defaultTitle,
    loadingTitle,
    requiredTitle,
    value,
    disabled,
    t
  } = this.props;

  const {
    status,
    items
  } = this.state;

  switch(status) {
    case DEFAULT_STATE:
    case LOADING_STATE:
      return (<div className="alert alert-info">{loadingTitle}</div>);
    case REQUIRED_STATE:
      return (<div className="alert alert-info">{requiredTitle}</div>);
    case LOADED_STATE:
      return (
        <CheckoutFieldSelect
          title={title}
          disabled={disabled}
          defaultTitle={defaultTitle}
          id={id}
          inputName={inputName}
          name={name}
          value={value}
          items={items}
          onChange={onChange}
          errorMessage={errorMessage}
        />
    );
    case ERROR_STATE:
      return (<div className="alert alert-danger">{t('vendor.ajax.error')}</div>);
    default:
      return (<div className="alert alert-danger">Unknown status {status}</div>)
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
