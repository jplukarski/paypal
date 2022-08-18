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

// Create the Card Fields Component and define callbacks
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
        // window.location.href = "approve.html";
      });
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
    onChange: function (event) {
      console.log("Value Changed: ", event);
    },
  });
  nameField.render(cardNameContainer);

  const numberField = cardField.NumberField({
    onChange: function (event) {
      console.log("Value Changed: ", event);
    },
  });
  numberField.render(cardNumberContainer);

  const cvvField = cardField.CVVField({
    onChange: function (event) {
      console.log("Value Changed: ", event);
    },
  });
  cvvField.render(cardCvvContainer);

  const expiryField = cardField.ExpiryField({
    onChange: function (event) {
      console.log("Value Changed: ", event);
    },
  });
  expiryField.render(cardExpiryContainer);

  const postalCodeField = cardField.PostalCodeField({
    minLength: 4,
    maxLength: 9,
    onChange: function (event) {
      console.log("Value Changed: ", event);
    },
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
    nameField.removeAttribute("placeholder");
  });

  // Disable or enable a field
  const disableButton = document.getElementById("mcf-disable");
  disableButton.addEventListener("click", () => {
    numberField.setAttribute("disabled", true);
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
    numberField.addClass("purple");
  });
  const removeClassButton = document.getElementById("mcf-remove-class");
  removeClassButton.addEventListener("click", () => {
    numberField.removeClass("purple");
  });

  // Add click listener to merchant-supplied submit button and call the submit function on the CardField component
  multiCardFieldButton.addEventListener("click", () => {
    cardField
      .submit({
        // Vault Spike
        vault: document.querySelector('#save').checked
       }
      )
      .then(() => {
        console.log("multi card fields submit");
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
