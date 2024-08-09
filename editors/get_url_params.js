let URL_DATA;
fetchData();

function fetchData(param="data") {
    URL_DATA = new URLSearchParams(window.location.search).get(param);
}