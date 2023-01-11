var xhr = new XMLHttpRequest();

xhr.open(
  "get",
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?Authorization=rdec-key-123-45678-011121314",
  true
);
xhr.send();

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status === 200) {
    var data = JSON.parse(this.responseText);
    var newArray = [data];
    console.log(data);
  }
};
