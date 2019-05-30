import { fetchGet } from 'helpers/fetchGet';

export function symbolSearch(keywords) {
  return fetchGet(process.env.REACT_APP_ALPHAVANTAGE_API_ADDRESS, {
    function: 'SYMBOL_SEARCH',
    apikey: process.env.REACT_APP_ALPHAVANTAGE_API_KEY,
    keywords
  })
    .then(data => {
      if (!Array.isArray(data.bestMatches)) {
        throw new Error(data.Note || 'Response does not hold required data');
      }
      return data.bestMatches.map(val => ({
        symbol: val['1. symbol'],
        name: val['2. name'],
        type: val['3. type'],
        region: val['4. region'],
        marketOpen: val['5. marketOpen'],
        marketClose: val['6. marketClose'],
        timezone: val['7. timezone'],
        currency: val['8. currency'],
        matchScore: val['9. matchScore']
      }));
    })
    .catch(error => {
      console.error({ error });
      return [];
    });
}
