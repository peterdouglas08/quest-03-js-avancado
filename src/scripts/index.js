import { getRepositories } from "/src/scripts/services/getRepositories.js";
import { getUser } from "/src/scripts/services/getUser.js";
import { getEvents } from "/src/scripts/services/getEvents.js";

import { user } from "/src/scripts/objects/user.js";
import { screen } from "/src/scripts/objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com os dados do usuário do GitHub 😰");
    return true;
  }
}

async function getUserData(userName) {

  const userResponse = await getUser(userName);

  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const RepositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName)

  user.setInfo(userResponse);
  user.setRepositories(RepositoriesResponse);
  user.setEvents(eventsResponse)

  screen.renderUser(user);
}
