/* eslint-disable consistent-return, new-cap, no-alert, no-console */

paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
    },
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '50.00'
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            window.location.href = "approve.html";
        });
    },
    onError: function (err) {
        console.log('Something went wrong', err);
    }
}).render('#paypal-button-container'); // Display payment options on your web page

paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'subscribe'
    },
    createSubscription: function (data, actions) {
        return actions.subscription.create({
            /* Creates the subscription */
            plan_id: 'P-0U385723JC662250XMFO6LII'
        });
    },
    onApprove: function (data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
    }
}).render('#paypal-button-container-P-0U385723JC662250XMFO6LII'); // Renders the PayPal button