/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/action/place-order',
        'Magento_Checkout/js/action/select-payment-method',
        'Magento_Customer/js/model/customer',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/payment/additional-validators',
        'mage/url',
    ],
    function (
        $,
        Component,
        placeOrderAction,
        selectPaymentMethodAction,
        customer,
        checkoutData,
        additionalValidators,
        url) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Paysera_Paysera/paysera'
            },

            placeOrder: function (data, event) {
                if (event) {
                    event.preventDefault();
                }
                var self = this,
                    placeOrder,
                    emailValidationResult = customer.isLoggedIn(),
                    loginFormSelector = 'form[data-role=email-with-possible-login]';
                if (!customer.isLoggedIn()) {
                    $(loginFormSelector).validation();
                    emailValidationResult = Boolean($(loginFormSelector + ' input[name=username]').valid());
                }
                if (emailValidationResult && this.validate() && additionalValidators.validate()) {
                    this.isPlaceOrderActionAllowed(false);
                    placeOrder = placeOrderAction(this.getData(), false, this.messageContainer);

                    $.when(placeOrder).fail(function () {
                        self.isPlaceOrderActionAllowed(true);
                    }).done(this.afterPlaceOrder.bind(this));
                    return true;
                }
                return false;
            },

            selectPaymentMethod: function() {
                selectPaymentMethodAction(this.getData());
                checkoutData.setSelectedPaymentMethod(this.item.method);
                return true;
            },

            afterPlaceOrder: function () {
                var xmlhttp = new XMLHttpRequest();
                var url = "http://"+window.location.hostname+"/paysera";

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var response = JSON.parse(xmlhttp.responseText);
                        window.location.href = response['url'];
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
        });
    }
);