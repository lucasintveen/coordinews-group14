async function restCreateUser(postUserData) {
  try {
    const response = await fetch("https://parseapi.back4app.com/users", {
      method: "POST",
      headers: {
        "X-Parse-Application-Id": "KqoIYLreqOxM9D4hI1VyukJBa7yj03D1dTd75CzR",
        "X-Parse-REST-API-Key": "vylMcMtNhHFcfFH4ROGrcWys4wi34V1mrILj0gmL ",
      },
      body: JSON.stringify(postUserData),
    });

    if (!response.ok) {
      const errorMessage = "Error with Status Code: " + response.status;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log("Response Data: ", responseData);
    return true;
  } catch (error) {
    console.log("Error: " + error);
  }
}

async function createNewUser() {
  const postData = {
    username: "mir3",
    password: "secret",
    email: "mir3@itu.dk",
  };

  try {
    const response = await fetch("https://parseapi.back4app.com/users/", {
      method: "POST",
      headers: {
        "X-Parse-Application-Id": "KqoIYLreqOxM9D4hI1VyukJBa7yj03D1dTd75CzR",
        "X-Parse-REST-API-Key": "vylMcMtNhHFcfFH4ROGrcWys4wi34V1mrILj0gmL",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const message = "Error with Status Code: " + response.status;
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error: " + error);
  }
}

export { restCreateUser, createNewUser };
