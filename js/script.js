//Global variables

const overview = document.querySelector(".overview"); //profile information will appear
const username = "VidaWee";
const displayRepoList = document.querySelector(".repo-list");
const infoRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backRepoButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUser = async function(){

    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserData(data);
    //console.log(data);
};

gitUser();

const displayUserData = function(data){

    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
     <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
    overview.append(div);
    gitRepo(username);

};

const gitRepo = async function(username){

    const repoList = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoList.json();
    displayRepoInfo(repoData)
};

//display all repos
const displayRepoInfo = function(repos){

    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        displayRepoList.append(repoItem);
    }
};

displayRepoList.addEventListener("click", function(e){

    if(e.target.matches("h3")){

        const repoName = e.target.innerText;
        getRepoInfo(repoName);
     
    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    //grab languages
    const fetchLanguage = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguage.json();

    //make list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
      }

      displaySpecRepoInfo(repoInfo, languages);
};


//displating individual repo info
const displaySpecRepoInfo = async function (repoInfo, languages){
    backRepoButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    infoRepos.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);

}

backRepoButton.addEventListener("click", function(){

    infoRepos.classList.remove("hide");
    repoData.classList.add("hide");
    backRepoButton.classList.add("hide")

});

//dynamic search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();
  
    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
  });