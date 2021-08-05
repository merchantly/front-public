export default function geideaPaymentWidget(order) {
  const { geideaPaymentForm } = order

  const startPayment = function() {
    try {
      const onSuccess = function(_data) {
        document.location.href = geideaPaymentForm.success_url;
      }

      const onError = function(data) {
        alert(data.responseCode + ': ' + data.responseMessage)
      }

      const onCancel = function(_data) {
        document.location.href = geideaPaymentForm.cancel_url;
      }

      const api = new GeideaApi(geideaPaymentForm.merchant_id, onSuccess, onError, onCancel);

      api.configurePayment({
        callbackUrl: geideaPaymentForm.callback_url,
        amount: (geideaPaymentForm.amount),
        currency: geideaPaymentForm.currency,
        merchantReferenceId: geideaPaymentForm.order_id.toString(),
        styles: {
          headerColor: geideaPaymentForm.header_color
        },
        merchantLogoUrl: geideaPaymentForm.merchant_logo_url
      });

      api.startPayment();
    } catch(err) {
      alert(err);
    }
  }

  const Scriptjs = require('scriptjs');

  Scriptjs('https://www.merchant.geidea.net/hpp/geideapay.min.js', startPayment.bind(this))
}
