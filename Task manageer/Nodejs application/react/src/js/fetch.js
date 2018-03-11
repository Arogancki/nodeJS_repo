exports.post = function post(url, body)
{   
    return fetch(url, {
        body: body,
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      }).then(res=>{
        if (res.status>=200 && res.status<400)
          return res;
        throw res
      })
}

exports.get = function get(url, body)
{   
    return fetch(url, {
        body: body,
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET'
      })
}
