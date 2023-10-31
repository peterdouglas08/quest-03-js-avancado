// VARIÁVEL QUE RENDERIZA E EXIBE OS DADOS DO USUÁRIO NA TELA
const screen = {
  userProfile: document.querySelector(".profile-data"),

  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
            <img src="${user.avatarUrl} alt="Foto perfil do usuário"/>
            <div class="data">
            <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
            <h3>${user.userName}</h3>
            <div class="follows">
            <h3>👻 ${user.followers} Seguidores</h3>
            <h3>👻 ${user.following} Seguindo</h3>
            </div>
            <br>
            <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p>
            </div>
            </div>`;

    let repositoriesItens = "";

    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li>
          <a href="${repo.html_url}" target="_blank"><h3>${repo.name}</h3>
            <div class="repo-icons">
              <i>🍴 ${repo.forks_count}</i>
              <i>⭐ ${repo.stargazers_count}</i>
              <i>👀 ${repo.watchers_count}</i>
              <i>👨🏻‍💻 ${repo.language}</i>
            </div>
          </a>
        </li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                                    <h2>Repositórios</h2>
                                                    <ul>${repositoriesItens}</ul>
                                               </div>`;
    }

    let eventsItens = "";
    user.events.forEach(function (event) {
      eventsItens += `<li><b>${event.repo.name}</b> - ${
        event.payload.commits
          ? event.payload.commits[0].message
          : "Não existe commit"
      }</li>`;
    });

    this.userProfile.innerHTML += `<div class="events section">
                                  <h2>Eventos</h2>
                                  <ul>${eventsItens}</ul>
                                 </div>`;

    console.log(eventsItens);
  },
  // VARIÁVEL QUE RENDERIZA E EXIBE UM ALERTA PARA USUÁRIOS NÃO ENCONTRADOS
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
