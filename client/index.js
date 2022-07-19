/* eslint-disable consistent-return, new-cap, no-alert, no-console */

const cardNameContainer = document.getElementById("card-name-field-container"); // Optional field
const cardNumberContainer = document.getElementById(
  "card-number-field-container"
);
const cardCvvContainer = document.getElementById("card-cvv-field-container");
const cardExpiryContainer = document.getElementById(
  "card-expiry-field-container"
);
const cardPostalCodeContainer = document.getElementById("card-postal-code-field-container");
const multiCardFieldButton = document.getElementById("multi-card-field-button");
const singleCardFieldsContainer = document.getElementById('single-card-fields-container')
const singleCardFieldButton = document.getElementById("single-card-field-button")

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

console.log('CardField Eligibility');
console.log(cardField)
const eligibiility = cardField.isEligible();
console.log(eligibiility);

cardField.render(singleCardFieldsContainer);
cardField.NameField().render(cardNameContainer);
cardField.NumberField().render(cardNumberContainer);
cardField.CVVField().render(cardCvvContainer);
cardField.ExpiryField().render(cardExpiryContainer);
cardField.PostalCodeField(
  {minLength: 4, maxLength: 9}
).render(cardPostalCodeContainer)

multiCardFieldButton.addEventListener('click', () => {
    console.log('clicked multi fields button')
    cardField.submit().then(()=>{
        console.log('multi card fields submit')
    }).catch((err) => {
        console.log("There was an error with multi card fields: ", err)
    })
});

singleCardFieldButton.addEventListener('click', () => {
    console.log('clicked single fields button')
    cardField.submit().then(()=>{
        console.log('single card fields submit')
    }).catch((err) => {
        console.log("There was an error with single card fields: ", err)
    })
})