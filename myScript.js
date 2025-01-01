document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  const btn = document.getElementById("generate");

  btn.addEventListener("click", fetchAndDisplayUser);
  fetchAndDisplayUser(); // fetch user on initial load
}

function showSpinner(show) {
  document.querySelector(".spinner").classList.toggle("hidden", !show);
}

function fetchAndDisplayUser() {
  showSpinner(true);
  fetch("https://randomuser.me/api/")
    .then((response) =>
      response.ok
        ? response.json() // parsing JSON data to JS object
        : new Promise((res, rej) => rej(new Error(`${response.status}`)))
    )
    .then((data) => displayUser(data.results[0]))
    .catch((error) => alert(error))
    .finally(() => showSpinner(false));
}

function displayUser(user) {
  console.log(user);
  const userDiv = document.getElementById("user");
  const userCard = document.getElementById("user-card");

  const userDetails = getUserDetails(user);
  console.log(userDetails);

  userDiv.innerHTML = ""; // erasing previous content
  userCard.classList.remove("bg-black", "bg-pink", "bg-blue"); // reseting color

  const textDiv = document.createElement("div");
  textDiv.id = "textDiv";
  userDiv.appendChild(textDiv);
  userDiv.style.justifySelf = "center";

  for (const [key, value] of userDetails) {
    displayUserDetails(key, value, textDiv);
  }

  userCard.classList.add(user.gender === "female" ? "bg-pink" : "bg-blue");
}

function getUserDetails(user) {
  return new Map([
    ["Image", user.picture.large],
    ["Name", `${user.name.first} ${user.name.last}`],
    ["Email", user.email],
    ["Phone", user.phone],
    ["Location", `${user.location.city} ${user.location.state}`],
    ["Age", user.dob.age],
  ]);
}

function displayUserDetails(detailType, detailValue, textDiv) {
  if (detailType === "Image") {
    let img = document.createElement("img");
    img.setAttribute("src", detailValue);

    textDiv.parentElement.insertBefore(img, textDiv);
  } else {
    let pTag = document.createElement("p");
    pTag.innerHTML = `<strong>${detailType}:</strong> ${detailValue}`;
    pTag.className = "mr-2";
    textDiv.appendChild(pTag);
  }
}
