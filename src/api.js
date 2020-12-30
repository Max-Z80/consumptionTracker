import axios from "axios";

const api = {
  get: function() {
    return axios.get("http://localhost:1234/get").catch(err => {
      console.err("An error occured while getting data");
    });
  },
  add: function(urlEncodedData) {
    return axios({
      method: "POST",
      url: "http://localhost:1234/add",
      data: urlEncodedData,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    }).catch(() => {
      console.log("Error while sending value to the server");
    });
  },
  editValue: function(urlEncodedData) {
    return axios({
      method: "POST",
      url: "/edit",
      data: urlEncodedData,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    }).catch(() => {
      console.log("Error while sending value to the server");
    });
  }
};

export default api;
