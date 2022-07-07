/* eslint-disable consistent-return, new-cap, no-alert, no-console */

const singleCardFieldButton = document.getElementById("single-card-field-button");

const styleObject = {
  input: {
    "font-size": "16 px",
    "font-family": "monospace",
    "font-weight": "lighter",
    color: "blue",
    "box-shadow": "10px 5px 5px red",
  }
};

const cardField = paypal.CardFields({
  // style: styleObject,
  createOrder: function (data, actions) {
    console.log("Here are the actions", actions);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "50.00",
          },
        },
      ],
    });
    // return fetch('/api/paypal/order/create/', {
    //     method: 'post'
    // }).then((res) => {
    //     return res.json();
    // }).then((orderData) => {
    //     console.log('Order: ', orderData)
    //     return orderData.id;
    // });
  },
  onApprove: function (data, actions) {
    console.log("on approve happened");
    return actions.order.capture().then(function (details) {
      window.location.href = "approve.html";
    });
  },
});

cardField.render("#paypal-card-field-container");

singleCardFieldButton.addEventListener("click", () => {
  cardField
    .submit()
    .then(() => {
      console.log("single card fields submit");
    })
    .catch((err) => {
      console.log("There was an error with single card fields: ", err);
    });
});
