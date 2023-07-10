//Global variables

const overview = document.querySelector(".overview"); //profile information will appear
const username = "VidaWee";
const displayRepoList = document.querySelector(".repo-list");


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
    gitRepo();

};

const gitRepo = async function(){

    const repoList = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoList.json();
    //console.log(data);
    displayRepoInfo(repoData)
};

const displayRepoInfo = function(repos){

    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        displayRepoList.append(repoItem);
    }
};
