import $ from 'jquery';
import NoticeService from '../services/Notice';
import buildParams from '../utils/buildParams';
import * as apiRoutes from '../../routes/api';
import * as actionTypes from '../constants/actionTypes';

export function changeOption(name, value) {
  return {
    type: actionTypes.DESIGN_CHANGE_OPTION,
    name,
    value,
  };
}

export function changeImage(name, file) {
  return {
    type: actionTypes.DESIGN_CHANGE_ATTACHMENT_OPTION,
    name,
    file,
  };
}

export function saveChanges(authUrl) {
  return (dispatch, getState) => {
    const { current } = getState().design;
    const ignoredKeys = ['logoUrl', 'pageBgUrl'];
    const data = Object.keys(current).reduce(function (previous, key) {
      if (ignoredKeys.indexOf(key) === -1) previous[key] = current[key];
      return previous;
    }, {});

    // FIXME: Use redux-actions with promise field
    dispatch({ type: actionTypes.DESIGN_SAVE });

    const formData = new FormData();
    const add = function add(key, value) {
      formData.append(key, value === null ? '' : value);
    };

    for(let key in data) {
      if(data.hasOwnProperty(key)) {
        buildParams(key, data[key], false, add);
      }
    }

    $.ajax({
      url: apiRoutes.designSettings(),
      method: 'PUT',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      xhrFields: {
        withCredentials: true,
      },
    }).then((design) => {
        dispatch({
          type: actionTypes.DESIGN_SAVE_SUCCESS,
          design,
        });
      })
      .fail((jqXHR) => {
        if (jqXHR.status === 401 && authUrl) {
          window.alert('Нет доступа для сохранения настроек, авторизуйтесь');
          window.location = authUrl;
        } else {
          NoticeService.errorResponse(jqXHR);
        }

        dispatch({ type: actionTypes.DESIGN_SAVE_FAILURE });
      });
  };
}
