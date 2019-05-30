export async function fetchGet(urlAddress, queryParams) {
  const url = new URL(urlAddress);
  url.search = new URLSearchParams(queryParams);
  return fetch(url).then(response => response.json());
}
