/* eslint-disable consistent-return, new-cap, no-alert, no-console */

const styleObject = {
  input: {
    "font-size": "16 px",
    "font-family": "monospace",
    "font-weight": "lighter",
    color: "blue",
    "box-shadow": "10px 5px 5px red",
  },
  ".invalid": {
    color: "purple",
  },
  ":hover":{
    color: "orange",
  }
};

const cardField = paypal.CardFields({
  style: styleObject,
  createOrder: function (data, actions) {
    return fetch("/api/paypal/order/create/", {
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((orderData) => {
        console.log("Order: ", orderData);
        return orderData.id;
      });
  },
  onApprove: function (data, actions) {
    const { orderID } = data;
    return fetch(`/api/paypal/orders/${orderID}/capture/`, {
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((orderData) => {
        console.log("Payment approved and captured:", orderData);
        window.location.href = "approve.html";
      });
    },
});

// Multi card Fields

const cardNameContainer = document.getElementById("card-name-field-container"); // Optional field
const cardNumberContainer = document.getElementById("card-number-field-container");
const cardCvvContainer = document.getElementById("card-cvv-field-container");
const cardExpiryContainer = document.getElementById("card-expiry-field-container");
const cardPostalCodeContainer = document.getElementById("card-postal-code-field-container"); // Optional field

const multiCardFieldButton = document.getElementById("multi-card-field-button");

cardField.NameField({
  onChange: function (event) {
    console.log('Value Changed: ', event)
  }
}).render(cardNameContainer);
cardField.NumberField({
  onChange: function (event) {
    console.log('Value Changed: ', event)
  }
}).render(cardNumberContainer);
cardField.CVVField({
  onChange: function (event) {
    console.log('Value Changed: ', event)
  }
}).render(cardCvvContainer);
cardField.ExpiryField({
  onChange: function (event) {
    console.log('Value Changed: ', event)
  }
}).render(cardExpiryContainer);
cardField.PostalCodeField({
  minLength: 4,
  maxLength: 9,
  onChange: function (event) {
    console.log('Value Changed: ', event)
  }
}).render(cardPostalCodeContainer);

multiCardFieldButton.addEventListener("click", () => {
  cardField
  .submit()
  .then(() => {
    console.log("multi card fields submit");
  })
  .catch((err) => {
    console.log("There was an error with multi card fields: ", err);
  });
});


// Single Card Fields
const singleCardFieldsContainer = document.getElementById("single-card-fields-container");

const singleCardFieldButton = document.getElementById("single-card-field-button");

cardField.render(singleCardFieldsContainer);

singleCardFieldButton.addEventListener("click", () => {
  console.log("clicked single fields button");
  cardField
  .submit()
  .then(() => {
    console.log("single card fields submit");
  })
  .catch((err) => {
    console.log("There was an error with single card fields: ", err);
  });
});