import { fetchGet } from 'helpers/fetchGet';
const localStorageKey = 'companies';

export function addCompany(newCompany) {
  const companies = getCompanies();
  if (companies.find(company => company.symbol === newCompany.symbol)) {
    return false;
  }
  companies.push(newCompany);
  localStorage.setItem(localStorageKey, JSON.stringify(companies));
  return true;
}

export function removeCompany(symbol) {
  const companies = getCompanies();
  const companyIndex = companies.findIndex(
    company => company.symbol === symbol
  );
  if (!~companyIndex) {
    return false;
  }
  companies.splice(companyIndex, 1);
  localStorage.removeItem(localStorageKey);
  localStorage.setItem(localStorageKey, JSON.stringify(companies));
}

export function getCompanies() {
  let companies = [];
  try {
    companies = Object.values(
      JSON.parse(localStorage.getItem(localStorageKey) || [])
    );
  } catch (error) {
    console.error({ error });
  }
  return companies;
}

async function getGlobalInfo(company) {
  try {
    const data = await fetchGet(
      process.env.REACT_APP_ALPHAVANTAGE_API_ADDRESS,
      {
        function: 'GLOBAL_QUOTE',
        symbol: company.symbol,
        apikey: process.env.REACT_APP_ALPHAVANTAGE_API_KEY
      }
    );
    if (!data['Global Quote']) {
      throw new Error(data.Note || 'Response does not hold required data');
    }
    return {
      symbol: data['Global Quote']['01. symbol'],
      open: data['Global Quote']['02. open'],
      high: data['Global Quote']['03. high'],
      low: data['Global Quote']['04. low'],
      price: data['Global Quote']['05. price'],
      volume: data['Global Quote']['06. volume'],
      lastDay: data['Global Quote']['07. latest trading day'],
      closed: data['Global Quote']['08. previous close'],
      change: data['Global Quote']['09. change'],
      percent: data['Global Quote']['10. change percent']
    };
  } catch (error) {
    console.error(error.message || error);
    return {};
  }
}

async function getSocialInfo(company) {
  const removeFromEnd = (string, suffix) => {
    string = string.endsWith(suffix)
      ? string.substring(0, string.lastIndexOf(suffix))
      : string;
    return string.trim();
  };
  let safeName = ['inc.', 'l.p.', '.com'].reduce(
    removeFromEnd,
    company.name.toLowerCase()
  );
  const data = await fetchGet(process.env.REACT_APP_AUTOCOMPLETE_API_ADDRESS, {
    query: safeName
  });
  try {
    if (!Array.isArray(data)) {
      throw new Error('Response does not hold required data');
    }
    const links = data.find(
      data =>
        typeof data.name === typeof '' &&
        data.name.toLowerCase() === safeName.toLowerCase()
    );
    return links
      ? {
          domain: links.domain,
          logo: links.logo
        }
      : {};
  } catch (error) {
    console.error(error.message || error);
    return {};
  }
}

export async function getCompaniesInfo() {
  return Promise.all(
    getCompanies().map(company =>
      Promise.all([getGlobalInfo(company), getSocialInfo(company)]).then(
        datas => Object.assign(...datas, company)
      )
    )
  );
}
