async function restCreateUser(postUserData) {
  var userToken;
  try {
    const response = await fetch("https://parseapi.back4app.com/users", {
      method: "POST",
      headers: {
        "X-Parse-Application-Id": process.env.REACT_APP_Application_Id,
        "X-Parse-REST-API-Key": process.env.REACT_APP_REST_API_Key,
      },
      body: JSON.stringify(postUserData),
    });

    if (!response.ok) {
      const errorMessage = "Error with Status Code: " + response.status;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    userToken = responseData.sessionToken;
    console.log("Response Data: ", responseData);
  } catch (error) {
    console.log("Error: " + error);
  }
  return userToken;
}

async function restGetCurrrentUser(X) {
  var responseData;
  try {
    const response = await fetch("https://parseapi.back4app.com/users/me", {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": process.env.REACT_APP_Application_Id,
        "X-Parse-REST-API-Key": process.env.REACT_APP_REST_API_Key,
        "X-Parse-Session-Token": X, // E.g. is returned in the function above}
      },
    });

    if (!response.ok) {
      const errorMessage = "Error with Status Code: " + response.status;
      throw new Error(errorMessage);
    }

    responseData = await response.json();
  } catch (error) {
    console.log("Error: " + error);
  }
  return responseData;
}

export { restCreateUser, restGetCurrrentUser };
