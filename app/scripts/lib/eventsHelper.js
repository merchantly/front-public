import { addEvent } from 'r/helpers/dom'

const EVENT_HELPER_SUBMIT_TIMEOUT = 300;

window.event_helper_submit = (function (id, callback) {
  const form = document.getElementById(id);
  form && addEvent(form, 'submit', function (ev) {
    if (callback && form.target !== '_blank') {
      if (ev.preventDefault) {
        ev.preventDefault();
      } else {
        ev.returnValue = false;
      }

      callback();
      window.setTimeout(function () {
        const newForm = document.createElement('form');
        document.body.appendChild(newForm);
        newForm.submit.apply(form);
        document.body.removeChild(newForm);
      }, EVENT_HELPER_SUBMIT_TIMEOUT);
    }
  }, false);
});

// Пример
// event_helper_submit('new_vendor_registration_form', function() { convead('event', 'submit_form'); }))
