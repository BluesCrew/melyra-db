let URL_DATA_ITEM;
fetchData();

function fetchData(param="data") {
    URL_DATA_ITEM = new URLSearchParams(window.location.search).get(param);
}