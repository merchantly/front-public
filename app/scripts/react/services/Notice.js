import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Notice from '../components/Notice';

const NoticeService = {
  getContainer() {
    let container = document.querySelector('[notice-container]');

    if (container == null) {
      container = document.createElement('div');
      container.setAttribute('notice-container', '');
      document.body.appendChild(container);
    }

    return container;
  },

  getTimeoutForText(text = '') {
    if (typeof text === 'object') return 3000;

    let multiplier = text.length < 30 ? 200 : 100;
    return text.length * multiplier;
  },

  notify(type, text, timeout, onClick) {
    timeout = timeout || this.getTimeoutForText(text);

    const container = this.getContainer();
    const data = {type, text, timeout};

    unmountComponentAtNode(container);
    render(<Notice {...data} onClose={this.close} onClick={onClick}/>, container);
  },

  notifyInfo(text, timeout, onClick) {
    this.notify('info', text, timeout), onClick;
  },

  notifyError(text, timeout) {
    this.notify('error', text, timeout);
  },

  notifySuccess(text, timeout) {
    this.notify('success', text, timeout);
  },

  errorResponse(response, timeout) {
    function isPageLoadingCanceled(response) {
      // Вернет true, если во время запроса пользователь:
      // - Остановил загрузку страницы
      // - Перешёл на другую страницу
      return response.statusText === 'error' && response.status == 0 && response.readyState == 0;
    }

    if (isPageLoadingCanceled(response) || response.statusText === 'abort') {
      return false;
    }

    let message = '';

    if (response.responseJSON != null) {
      let { responseJSON: json } = response;
      message = json.message || json.long_message || json.error;
    } else {
      message = `Network error: ${response.statusText}`;
    }

    this.notifyError(message, timeout);
  },

  close() {
    const container = this.getContainer();
    unmountComponentAtNode(container);
  },
};

NoticeService.notifyError = NoticeService.notifyError.bind(NoticeService);
NoticeService.notifySuccess = NoticeService.notifySuccess.bind(NoticeService);
NoticeService.notifyInfo = NoticeService.notifyInfo.bind(NoticeService);
NoticeService.close = NoticeService.close.bind(NoticeService);
NoticeService.getTimeoutForText = NoticeService.getTimeoutForText.bind(NoticeService);
NoticeService.getContainer = NoticeService.getContainer.bind(NoticeService);

global.NoticeService = NoticeService;

export default NoticeService;
