"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APP = void 0;
var jsonUrl = "http://jsonplaceholder.typicode.com/comments";
var dataPerpage = 20;
var onPage = 1;
var dataComment = [];
var sortOrder = 'ascending';
var filter = 'postId'; // getData(jsonUrl, filter)

function getData(jsonUrl, field) {
  fetch(jsonUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    dataComment = json;
    sortingData(json, field);
    showPagination(json);
  }).catch(function (err) {
    return alert(err);
  });
}

function toJson(data) {
  return data.json();
}

function showPagination(totalData) {
  var paginationElem = document.getElementById('pagination');
  paginationElem.innerHTML = "";
  var totalPage = Math.ceil(searchData(totalData).length / dataPerpage);

  for (var i = 1; i <= totalPage; i++) {
    var buttonPage = document.createElement('button');
    buttonPage.textContent = i;
    buttonPage.onclick = changePage(i);

    if (onPage === i) {
      buttonPage.disabled = true;
      buttonPage.className = "page-active";
    }

    paginationElem.appendChild(buttonPage);
  }
}

function changePage(page) {
  return function () {
    onPage = page; // getData(jsonUrl, 'name')

    sortingData(dataComment, filter);
    showPagination(dataComment);
  };
}

function changeFilter() {
  var selectElem = document.getElementById('filter-option'); // getData(jsonUrl, selectElem.value.toLowerCase())

  filter = selectElem.value;
  sortingData(dataComment, filter);
  showPagination(dataComment);
}

function changeSortOrder() {
  var sortorderElem = document.getElementById('sort-order');
  sortOrder = sortorderElem.value;
  sortingData(dataComment, filter);
  showPagination(dataComment);
}

function sortingData(dataJson, filter) {
  // let data = dataJson
  var data = APP.searchData(dataJson);
  data.sort(function (a, b) {
    var dataA = a[filter];
    var dataB = b[filter];

    if (dataA < dataB) {
      return -1;
    }

    if (dataA > dataB) {
      return 1;
    }

    return 0;
  });

  if (sortOrder === 'descending') {
    data = data.reverse();
  }

  return APP.showData(data);
}

function searchData(dataJson) {
  var dataSearch = Object.assign([], dataJson);
  var keySearchElem = document.getElementById('search-key');
  dataSearch = dataSearch.filter(function (data) {
    return data.body.toLowerCase().includes(keySearchElem.value.toLowerCase());
  });
  return dataSearch;
}

function onChangeSearchKey() {
  sortingData(dataComment, filter);
  showPagination(dataComment);
}

function showData(dataJson) {
  var containerElem = document.getElementById('container');
  containerElem.innerHTML = "";
  var maxDataShow = dataPerpage * onPage;

  for (var i = maxDataShow - dataPerpage; i < maxDataShow; i++) {
    if (dataJson[i] !== undefined) {
      var contentElem = document.createElement('div');
      contentElem.className = "content";
      var fieldPostIdELem = document.createElement('div');
      var fieldIdElem = document.createElement('div');
      var fieldNameELem = document.createElement('div');
      var fieldEmailELem = document.createElement('div');
      var fieldBodyELem = document.createElement('div');
      var textPostID = document.createElement('span');
      textPostID.textContent = "Post Id : ".concat(dataJson[i].postId);
      fieldPostIdELem.appendChild(textPostID);
      var textId = document.createElement('span');
      textId.textContent = "Id : ".concat(dataJson[i].id);
      fieldIdElem.appendChild(textId);
      var textName = document.createElement('span');
      textName.textContent = "Name : ".concat(dataJson[i].name);
      fieldNameELem.appendChild(textName);
      var textEmail = document.createElement('span');
      textEmail.textContent = "Email : ".concat(dataJson[i].email);
      fieldEmailELem.appendChild(textEmail);
      var textBody = document.createElement('span');
      textBody.textContent = "Body : ".concat(dataJson[i].body);
      fieldBodyELem.appendChild(textBody);
      contentElem.appendChild(fieldPostIdELem);
      contentElem.appendChild(fieldIdElem);
      contentElem.appendChild(fieldNameELem);
      contentElem.appendChild(fieldEmailELem);
      contentElem.appendChild(fieldBodyELem);
      containerElem.appendChild(contentElem);
    }
  }
} // TESTING


var APP = {
  showData: showData,
  searchData: searchData,
  sortingData: sortingData,
  getData: getData,
  jsonUrl: jsonUrl,
  filter: filter
};
exports.APP = APP;