async function restCreateUser(postUserData) {
  try {
    const response = await fetch("https://parseapi.back4app.com/users/", {
      method: "POST",
      headers: {
        "X-Parse-Application-Id": "KqoIYLreqOxM9D4hI1VyukJBa7yj03D1dTd75CzR",
        "X-Parse-REST-API-Key": "vylMcMtNhHFcfFH4ROGrcWys4wi34V1mrILj0gmL",
      },
      body: JSON.stringify(postUserData),
    });

    if (!response.ok) {
      const errorMessage = "Error with Status Code: " + response.status;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.log("Error: " + error);
  }
}

export { restCreateUser };
