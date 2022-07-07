const express = require("express")
const { resolve } = require("path")
const fetch = require("node-fetch");

const app = express()

app.use(express.static(resolve(__dirname, "../client")))

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/index.html"));
});

// const CLIENT_ID = 'alc_client1'
// const APP_SECRET = 'secret'
// const CLIENT_ID = 'B_AF7iNYDLbxkdU12xnJWgVZDmfKv7khjdgZ6mMG89YNVD2mH3dE-ypPQxh3WW8eDYSUJUOY0i__WTicdo'
// const APP_SECRET = 'ENzQHG7oxCna3MsFKqtSx1Vr1fyRIHPfFtnZ4efurqYARwOttdIB_MRslf45l_DA4I1MQz8afW6SFAQf'
 
const CLIENT_ID = 'B_A3Nk8jo-3tRnmAWKP1vmp7hhd4oSTLUSzyS3A3WvmOPWc2syHRjoA68GmQpjiPVc3X2sexAwMQaNn2Lk'
const APP_SECRET = 'EEF_V0V35vFQl_M7nDSDLBevD_ptRnRmcgZrRBlpac7Vpdz9J0_aCDa5pINFlOXMwe1vfXkccQeUm-uY'
const base = "http://localhost.paypal.com:8000";

(async function () {

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
    // res.sendFile(resolve(__dirname, "../client/index.html"));
    // console.log('Request', req)
    // res.json({id: '123456789'})
    // paypalSDK.createOrder(res)
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
      }),
    });
    const data = await response.json();
    console.log('Data: ', data)
    res.json(data);
  });

})();

app.listen(8080)
