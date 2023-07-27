import URI from "urijs";
import swagger from "swagger-client";
import * as CryptoJS from "crypto-js";

const apiConfig = {
  devid: "3002174",
  apikey: "24030e89-d965-465f-8c63-f2e8072a3e89",
};

const createSignature = (path, key) => {
  return CryptoJS.HmacSHA1(path, key).toString().toUpperCase();
};

export const ptvApi = async (devid, apikey) => {
  return swagger({
    url: "https://timetableapi.ptv.vic.gov.au/v3/",
    spec: require("./ptv-openapi.json"),
    requestInterceptor: function (req) {
      let url = URI(req.url).addQuery({ devid: devid });
      let signature = createSignature(
        url.toString().replace(/.*ptv.vic.gov.au/, ""),
        apikey
      );
      req.url = url.addQuery({ signature: signature }).toString();
      return req;
    },
  })
    .then((client) => client.apis)
    .then(console.log("Connected to PTV API!"));
};

export const ptvClient = ptvApi(apiConfig.devid, apiConfig.apikey);
