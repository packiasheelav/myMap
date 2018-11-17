logResult = result => {
  console.log(result);
};

logError = error => {
  console.log("Looks like there was a problem: \n", error);
};

validateResponse = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

readResponseAsJSON = response => {
  console.log(response);
  return response.json();
};

fetchJSON = (pathToResource, showResult) => {
  fetch(pathToResource)
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(showResult)
    .catch(logError);
};
