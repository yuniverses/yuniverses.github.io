let map;
var xhr = new XMLHttpRequest();
var restaurantData = "";
var restaurantDataLength = "";
var testInput = "餐廳";

$("#close").click(function () {
  $("#infoModal").hide();
});

// 設置定位
function mapCenterControl(map, clickButton) {
  // 主頁按鈕1
  let centerControlDiv = document.getElementById("randombtn");
  let controlUI = document.createElement("button");
  centerControlDiv.appendChild(controlUI);

  let controlText = document.createElement("div");
  controlText.classList.add("btnbox");
  controlText.style.width = "200pt";
  controlText.style.height = "200pt";
  controlText.style.cursor = "pointer";
  controlText.innerHTML =
    '<img src="./img/Star1.svg" class="star" alt="" /><h1 class="tit1">我要附近隨便吃</h1><p class="p2">神奇美食地圖幫你在附近隨機找一間餐廳</p>';
  controlUI.appendChild(controlText);

  // constructor passing in this DIV.
  centerControlDiv.index = 1; // 排列優先度

  // 主頁按鈕2
  let centerControlDiv2 = document.getElementById("typesearchbtn");
  let controlUI2 = document.createElement("button");
  centerControlDiv2.appendChild(controlUI2);

  let controlText2 = document.createElement("div");
  controlText2.classList.add("typesearchbtn");
  controlText2.style.cursor = "pointer";
  controlText2.innerHTML =
    '<span class="material-symbols-outlined"> search </span>';
  controlUI2.appendChild(controlText2);

  let main = document.getElementById("main");

  // 主頁按鈕event listeners.
  controlUI.addEventListener("click", () =>
    clickButton((main.style.display = "none"))
  );
  controlUI2.addEventListener("click", () =>
    clickButton((main.style.display = "none"))
  );
}

// 取得使用者位置

function gettingPosition() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      let option = {
        enableAcuracy: false, // 提高精確度
        maximumAge: 0, // 設定上一次位置資訊的有效期限(毫秒)
        timeout: 10000, // 逾時計時器(毫秒)
      };
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    });
  } else {
    alert("Does not support positioning!");
  }
}

function gettingPosition() {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      let option = {
        enableAcuracy: false, // 提高精確度
        maximumAge: 0, // 設定上一次位置資訊的有效期限(毫秒)
        timeout: 10000, // 逾時計時器(毫秒)
      };
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    });
  } else {
    alert("Does not support positioning!");
  }
}

function errorCallback(error) {
  // alert(error.message); //error.code
  if (error.message === "User denied Geolocation") {
    var address = prompt("無法獲得你的定位啦/請輸入你的所在地點", "台藝大");
    var geocoder;
    var map;

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng,
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    geocoder.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        console.log(results[0].geometry.location.lat().toFixed(4));
        console.log(results[0].geometry.location.lng().toFixed(4));
        map.setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });

        var testInput = document.getElementById("typesearch");
        var restrentValue = testInput.value;
        keyword = restrentValue;
        xhr.open(
          "get",
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
            results[0].geometry.location.lat().toFixed(4) +
            "," +
            results[0].geometry.location.lng().toFixed(4) +
            "&radius=1000&type=restaurant&keyword=" +
            keyword +
            "&language=zh-TW&key=AIzaSyAdPPyMZ3i9lWkTdxHMndofNI4FxLZa8kU",
          true
        );
        console.log(xhr);
        xhr.send();
        xhr.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 403) {
            alert("請前往cors-anywhere開啟cors權限。");
            window.open("https://cors-anywhere.herokuapp.com/corsdemo");
            location.reload();
          }
          if (this.readyState === 4 && this.status === 200) {
            document.getElementById("infoModal").style.display = "none";
            var data = JSON.parse(this.responseText);
            var newArray = [data];
            console.log(data);
            console.log(data.results);
            console.log("筆數有幾筆");
            total_li = data.results.length;
            console.log(total_li);
            let x = Math.floor(Math.random() * data.results.length);
            console.log(data.results[x]);

            document.getElementById("randomLi").innerHTML =
              '<img class="foodimg" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
              data.results[x].photos[0].photo_reference +
              '&key=AIzaSyAdPPyMZ3i9lWkTdxHMndofNI4FxLZa8kU"/>' +
              "<h1>就吃<span>" +
              data.results[x].name +
              '</span>吧～</h1><div class="info"><div class="infoleft"><div><p>' +
              data.results[x].vicinity +
              '</p></div><a href="https://www.google.com.tw/maps/place/' +
              data.results[x].vicinity +
              '">立即前往</a>' +
              "<div><p>價格等級：</p><p>" +
              data.results[x].price_level +
              '<p>/3</p></p></div><div><p>營業狀態：</p><p id="open_now">' +
              data.results[x].opening_hours.open_now +
              '</p></div></div><div class="inforight"><div class="star"><img src="./img/Star3.svg" alt="" /><p>' +
              data.results[x].rating +
              '</p></div></div></div><div class="resultbtn"><button class="redobtn" id="redobtn" onclick="javascript:window.location.reload()"> <img src="./img/redo.svg" alt="" /><p>redo</p></button><button class="sharebtn" id="sharebtn"><img src="./img/share.svg" alt="" /></button></div>';

            "<h1>" +
              data.results[x].name +
              "</h1>" +
              "<p>" +
              data.results[x].rating +
              "</p>" +
              '<a href="https://www.google.com.tw/maps/place/' +
              data.results[x].vicinity +
              '">立即前往</a>';
            // Loop over the array
            for (i = 0; i < total_li; i++) {
              // Put the whole row into your table
              // console.log(data.results[i].name);

              document.getElementById("loding").style.display = "none";
              //搜尋結果
              total_photos = data.results[i].photos.length;
              // console.log(total_photos);
              for (p = 0; p < total_photos; p++) {
                console.log(data.results[i].photos[p].photo_reference);
                document.getElementById("restaurantLi").innerHTML +=
                  '<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                  data.results[i].photos[p].photo_reference +
                  '&key=AIzaSyAdPPyMZ3i9lWkTdxHMndofNI4FxLZa8kU"/>';
              }
              document.getElementById("restaurantLi").innerHTML +=
                '<div class="list">' +
                "<h1>" +
                data.results[i].name +
                "</h1>" +
                '<div class="list2">' +
                '<img src="./img/Star4.svg" alt="" /><p>' +
                data.results[i].rating +
                "</p>" +
                '<a href="https://www.google.com.tw/maps/place/' +
                data.results[i].vicinity +
                '">立即前往</a>' +
                "<div>" +
                "</div>";
            }
          }
        };
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

function successCallback(position) {
  map.setCenter({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
  var testInput = document.getElementById("typesearch");
  var restrentValue = testInput.value;
  keyword = restrentValue;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  xhr.open(
    "get",
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      position.coords.latitude.toFixed(4) +
      "," +
      position.coords.longitude.toFixed(4) +
      "&radius=1000&type=restaurant&keyword=" +
      keyword +
      "&language=zh-TW&key=AIzaSyAdPPyMZ3i9lWkTdxHMndofNI4FxLZa8kU",
    true
  );
  console.log(xhr);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 403) {
      alert("請前往cors-anywhere開啟cors權限。");
      window.open("https://cors-anywhere.herokuapp.com/corsdemo");
      location.reload();
    }
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("infoModal").style.display = "none";
      var data = JSON.parse(this.responseText);
      var newArray = [data];
      console.log(data);
      console.log(data.results);
      console.log("筆數有幾筆");
      total_li = data.results.length;
      console.log(total_li);
      let x = Math.floor(Math.random() * data.results.length);
      console.log(data.results[x]);

      document.getElementById("randomLi").innerHTML =
        '<img class="foodimg" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
        data.results[x].photos[0].photo_reference +
        '&key=AIzaSyAdPPyMZ3i9lWkTdxHMndofNI4FxLZa8kU"/>' +
        "<h1>就吃<span>" +
        data.results[x].name +
        '</span>吧～</h1><div class="info"><div class="infoleft"><div><p>' +
        data.results[x].vicinity +
        '</p></div><a href="https://www.google.com.tw/maps/place/' +
        data.results[x].vicinity +
        '">立即前往</a>' +
        "<div><p>價格等級：</p><p>" +
        data.results[x].price_level +
        '<p>/3</p></p></div><div><p>營業狀態：</p><p id="open_now">' +
        data.results[x].opening_hours.open_now +
        '</p></div></div><div class="inforight"><div class="star"><img src="./img/Star3.svg" alt="" /><p>' +
        data.results[x].rating +
        '</p></div></div></div><div class="resultbtn"><button class="redobtn" id="redobtn" onclick="javascript:window.location.reload()"> <img src="./img/redo.svg" alt="" /><p>redo</p></button><button class="sharebtn" id="sharebtn"><img src="./img/share.svg" alt="" /></button></div>';

      "<h1>" +
        data.results[x].name +
        "</h1>" +
        "<p>" +
        data.results[x].rating +
        "</p>" +
        '<a href="https://www.google.com.tw/maps/place/' +
        data.results[x].vicinity +
        '">立即前往</a>';
      // Loop over the array
      for (i = 0; i < total_li; i++) {
        // Put the whole row into your table
        // console.log(data.results[i].name);

        document.getElementById("loding").style.display = "none";
        //搜尋結果
        total_photos = data.results[i].photos.length;
        // console.log(total_photos);
        for (p = 0; p < total_photos; p++) {
          console.log(data.results[i].photos[p].photo_reference);
          document.getElementById("restaurantLi").innerHTML +=
            '<img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
            data.results[i].photos[p].photo_reference +
            '&key=AIzaSyAdPPyMZ3i9lWkTdxHMndofNI4FxLZa8kU"/>';
        }
        document.getElementById("restaurantLi").innerHTML +=
          '<div class="list">' +
          "<h1>" +
          data.results[i].name +
          "</h1>" +
          '<div class="list2">' +
          '<img src="./img/Star4.svg" alt="" /><p>' +
          data.results[i].rating +
          "</p>" +
          '<a href="https://www.google.com.tw/maps/place/' +
          data.results[i].vicinity +
          '">立即前往</a>' +
          "<div>" +
          "</div>";
      }
    }
  };
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: 25.033708, lng: 121.564899 },
  });
  mapCenterControl(map, () =>
    gettingPosition()
      .then((position) => successCallback(position))
      .catch((error) => errorCallback(error))
  );
}
var dropdown = new IconicDropdown({
  select: "#foodType",
  placeholder: "Select A Country...",
});

dropdown.init();
