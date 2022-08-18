const express = require("express")
const { resolve } = require("path")
const fetch = require("node-fetch");
const { application } = require("express");

const app = express()

app.use(express.static(resolve(__dirname, "../client")))

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/index.html"));
});

const CLIENT_ID = 'B_A3Nk8jo-3tRnmAWKP1vmp7hhd4oSTLUSzyS3A3WvmOPWc2syHRjoA68GmQpjiPVc3X2sexAwMQaNn2Lk'
const APP_SECRET = ''
const base = "http://localhost.paypal.com:8000";

(async function () {

  // Vault w/ Purchase Spike
  // async function generateClientToken() {
  //   const accessToken = await generateAccessToken();
  //   const response = await fetch(`${base}/v1/identity/generate-token`, {
  //     headers:{
  //       Accept: 'application/json',
  //       "Accept-Language": 'en_US',
  //       Authorization: `Bearer ${accessToken}`, 
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       "customer_id": "example_customer_id"
  //     })
  //   })
  // }

  async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();
    return data.access_token;
  }

  app.post("/api/paypal/order/create/", async (req, res) => {
    console.log("Response", res)
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100.00",
            },
          },
        ],
        // Vault with Purchase spike
        "payment_source": {
          "card": {
            "name": "Joe Paypal",
            "billing_address":{
              // billing address details
            },
            "attributes": {
              "customer": {
                "id": "example_customer_id"
              },
              "vault": {
                "store_in_vault": "ON_SUCCESS",
              }
            }
          }
        }
      }),
    });
    const data = await response.json();
    console.log('Data: ', data)
    res.json(data);
  });

  app.post("/api/paypal/orders/:id/capture", async (req, res) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${req.params.id}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({})
    });
    const data = await response.json();
    console.log('Data: ', data)
    res.json(data);
  });

  // 

})();

app.listen(8080)
