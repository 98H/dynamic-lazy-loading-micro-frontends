var fetchMainAppApi = async function() {
  var response = await fetch('https://micro-frontends-api.vercel.app/api/main-app-api');
  var data = await response.json();
  return data;
}

exports.fetchMainAppApi = fetchMainAppApi;