/* eslint-disable consistent-return, new-cap, no-alert, no-console */

// Custom Styles Object
const styleObject = {
  input: {
    "font-size": "16 px",
    "font-family": "monospace",
    "font-weight": "lighter",
    color: "blue",
    "box-shadow": "10px 5px 5px red",
  },
  // ".invalid": {
  //   color: "purple",
  // },
  ":hover": {
    color: "orange",
  },
  ".purple": {
    color: "purple",
  },
};

// const onChange = function(event) {
//   console.log(event)
//   // if (event.inputSubmitRequest){

//   // }
// }

const onInputSubmitRequest = function (event) {
  // check if all fields are valid
  // if so, call cardField.submit()
  // if not display message saying what
};

const onFocusCallback = function (event) {
  console.log("focus from test app", event);
};

// Create the Card Fields Component and define callbacks
const cardField = paypal.CardFields({
  // style: styleObject,
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
        // window.location.href = "approve.html";
        document.getElementById('payment-id').innerHTML = `Order ID: ${JSON.stringify(orderData.id)}`
        document.getElementById('payment-source').innerHTML = `Payment Source: ${JSON.stringify(orderData.payment_source)}`
        document.getElementById('payment-status').innerHTML = `Status: ${JSON.stringify(orderData.status)}`
      });
  },
  inputEvents: {
    // onChange: function (data) {
    //   console.log("Input Change Handler in Parent");
    //   console.log(data);
    // },
    // onFocus: function(data) {
    //   console.log("Focus Change Handler in Parent");
    //   console.log(data);
    // },
    // onBlur: function(data) {
    //   console.log("Blur Change Handler in Parent");
    //   console.log(data);
    // },
    onInputSubmitRequest: function(data) {
      console.log('Input submit request in parent')
      console.log(data)
    }
  },
});

// Define Container for each field
const cardNameContainer = document.getElementById("card-name-field-container"); // Optional field
const cardNumberContainer = document.getElementById(
  "card-number-field-container"
);
const cardCvvContainer = document.getElementById("card-cvv-field-container");
const cardExpiryContainer = document.getElementById(
  "card-expiry-field-container"
);
const cardPostalCodeContainer = document.getElementById(
  "card-postal-code-field-container"
); // Optional field

const multiCardFieldButton = document.getElementById("multi-card-field-button");

// Render each field, define the onChange callback
// Check eligibility first
if (cardField.isEligible()) {
  const nameField = cardField.NameField({
    // style: styleObject,
    inputEvents: {
      // onChange: function(data) {
      //   console.log('Take the onChange from the name field pls')
      //   console.log(data)
      // },
      onInputSubmitRequest: function(data){
        console.log('Take the input submit request from the name field pls')
        console.log(data)
      },
      // onFocus: function(data){
      //   console.log('Take the onFocus from the name field pls')
      //   console.log(data)
      // },
      // onBlur: function(data){
      //   console.log('Take the onBlur from the name field pls')
      //   console.log(data)
      // }
    }
  });
  console.log(nameField);
  nameField.render(cardNameContainer);
  const numberField = cardField.NumberField({

  });
  numberField.render(cardNumberContainer);

  const cvvField = cardField.CVVField()
  cvvField.render(cardCvvContainer);

  const expiryField = cardField.ExpiryField({

  });
  expiryField.render(cardExpiryContainer);

  const postalCodeField = cardField.PostalCodeField({

    minLength: 4,
    maxLength: 9,

  });
  postalCodeField.render(cardPostalCodeContainer);

  // Set or remove an attribute on a field based on an event
  // Supported attributes are aria-invalid, aria-required, disabled, placeholder
  const setPlaceholder = document.getElementById("mcf-set-placeholder");
  setPlaceholder.addEventListener("click", () => {
    console.log("setting placeholder");
    nameField.setAttribute("placeholder", "Name as it appears on Card");
  });

  const removePlaceholder = document.getElementById("mcf-remove-placeholder");
  removePlaceholder.addEventListener("click", () => {
    console.log(nameField.removeAttribute("placeholder"));
  });

  // Disable or enable a field
  const disableButton = document.getElementById("mcf-disable");
  disableButton.addEventListener("click", () => {
    console.log(numberField.setAttribute("disabled", true));
  });

  const enableButton = document.getElementById("mcf-enable");
  enableButton.addEventListener("click", () => {
    numberField.removeAttribute("disabled");
  });

  // Add or remove aria-invalid attribute
  const addAriaInvalid = document.getElementById("mcf-set-aria-invalid");
  addAriaInvalid.addEventListener("click", () => {
    cvvField.setAttribute("aria-invalid", "grammar");
  });

  const removeAriaInvalid = document.getElementById("mcf-remove-aria-invalid");
  removeAriaInvalid.addEventListener("click", () => {
    cvvField.removeAttribute("aria-invalid");
  });

  // Add or remove aria-required attribute
  const addAriaRequired = document.getElementById("mcf-set-aria-required");
  addAriaRequired.addEventListener("click", () => {
    nameField.setAttribute("aria-required", true);
  });

  const removeAriaRequired = document.getElementById(
    "mcf-remove-aria-required"
  );
  removeAriaRequired.addEventListener("click", () => {
    nameField.removeAttribute("aria-required");
  });

  // Add or remove a class
  const addClassButton = document.getElementById("mcf-add-class");
  addClassButton.addEventListener("click", () => {
    console.log(numberField.addClass("purple"));
  });
  const removeClassButton = document.getElementById("mcf-remove-class");
  removeClassButton.addEventListener("click", () => {
    console.log(numberField.removeClass("purple"));
  });

  // Focus on the cardNumber field
  const focusNumberButton = document.getElementById("mcf-focus");
  focusNumberButton.addEventListener("click", () => {
    console.log(numberField.focus());
  });

  // Clear the value in the name field
  const clearNameButton = document.getElementById("mcf-clear");
  clearNameButton.addEventListener("click", () => {
    console.log(nameField.clear());
  });

  // Set message on card number field
  const setMessageButton = document.getElementById("mcf-setMessage");
  setMessageButton.addEventListener("click", () => {
    numberField.setMessage("Screenreader message!");
  });

  // Get state object for all fields
  const getStateButton = document.getElementById("mcf-getState");
  getStateButton.addEventListener("click", () => {
    // console.log(cardField.getState())
    // const state = cardField.getState()
    // console.log('state',state)
    // console.log(cardField.getState())
    cardField.getState().then((res, err) => {
      // do something
      if (err) {
        console.log("GetState Error: ", err);

        return;
      }
      console.log("From the test kitchen", res);
    });
    // nameField.getState()
    // cardField.addClass('some-class')
  });

  // setInterval(()=>{
  //   console.log(cardField.getState())
  // },3000)

  const cardNameSetMessage = document.getElementById("setMessageCardName");
  const cardNumberSetMessage = document.getElementById("setMessageCardNumber");
  const cvvSetMessage = document.getElementById("setMessageCvv");
  const expirySetMessage = document.getElementById("setMessageExpiry");
  const postalCodeSetMessage = document.getElementById("setMessagePostalCode");

  cardNameSetMessage.addEventListener("click", () => {
    nameField.setMessage("set mesaage for name field");
  });
  cardNumberSetMessage.addEventListener("click", () => {
    numberField.setMessage("set mesaage for number field");
  });
  cvvSetMessage.addEventListener("click", () => {
    cvvField.setMessage("set mesaage for cvv field");
  });
  expirySetMessage.addEventListener("click", () => {
    expiryField.setMessage("set mesaage for expiry field");
  });
  postalCodeSetMessage.addEventListener("click", () => {
    postalCodeField.setMessage("set mesaage for postal code field");
  });

  // Add click listener to merchant-supplied submit button and call the submit function on the CardField component
  multiCardFieldButton.addEventListener("click", () => {
    cardField
      .submit()
      .then((res) => {
        console.log("multi card fields submit");
        console.log('response: ', res)
      })
      .catch((err) => {
        console.log("There was an error with multi card fields: ", err);
      });
  });
}

// Single Card Fields
const singleCardFieldsContainer = document.getElementById(
  "single-card-fields-container"
);

const singleCardFieldButton = document.getElementById(
  "single-card-field-button"
);

// const singleCardFieldsFocus = document.getElementById('scf-focus');
// singleCardFieldsFocus.addEventListener('click', () => {
//   cardField.focus()
// });

// const singleCardFieldsClear = document.getElementById('scf-clear');
// singleCardFieldsClear.addEventListener('click', () => {
//   cardField.clear()
// })

cardField.render(singleCardFieldsContainer);

// singleCardFieldButton.addEventListener("click", () => {
//   console.log("clicked single fields button");
//   cardField
//     .submit()
//     .then(() => {
//       console.log("single card fields submit");
//     })
//     .catch((err) => {
//       console.log("There was an error with single card fields: ", err);
//     });
// });
