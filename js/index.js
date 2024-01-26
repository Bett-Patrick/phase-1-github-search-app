document.addEventListener("DOMContentLoaded", ()=>{
    let url = ""
    getUserInput()

    // Fetch users with default search value when the page loads
    url = "https://api.github.com/search/users?q=octocat";
    fetchUsers(url);

    //function to get user input
    function getUserInput (){
        let searchForm = document.querySelector("#github-form")
        searchForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            let searchInput = document.querySelector("#search").value
            url = `https://api.github.com/search/users?q=${searchInput}`
            document.querySelector("#user-list").innerHTML = ""
            fetchUsers(url)
            document.querySelector("#search").value = ""
        })
    }

    // function to fetch users based matching search input
    function fetchUsers(url){
        fetch(url,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        }
        })
        .then(res => res.json())
        .then((data)=>{
            let users = data.items
            users.forEach((userObject)=>{
                // console.log(userObject.login)
                // console.log(userObject.repos_url)
                renderMatchingUsers(userObject)
            })
        })
    } 

    // function to render users based matching search input
    function renderMatchingUsers(userObject){
        
        const userList = document.querySelector("#user-list")
        const userContainer = document.createElement("div")
        userContainer.className = "user-container"
        userContainer.innerHTML = ` 
            <img src = "${userObject.avatar_url}"></img>
            <div id = "avatar-name">
                <span>${userObject.login}</span>
            <a href =${userObject.html_url} target = "_blank">View Profile</a>
            <button id = "repos-btn">View Repos</button>
            </div>
        `
        userList.appendChild(userContainer)
        const reposBtn = userContainer.querySelector("#repos-btn")
        reposBtn.addEventListener("click", ()=>{
            fetchRepos(userObject.login)
        })
    }

    //function to fetch clicked user's repos
    function fetchRepos(userName){
        console.log(userName)
        fetch(`https://api.github.com/users/${userName}/repos`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then(res=>res.json())
        .then((reposArray)=>{
            // console.log(data)
            reposArray.forEach((repoObject)=>renderRepos(repoObject))
        })
    }

    //function to render clicked user's repos
    function renderRepos(repoObject){
        const reposList = document.querySelector("#repos-list")
        const owner =document.querySelector(".owner")
        owner.textContent = `${repoObject.owner.login}'s Repositories`

        const repoContainer = document.createElement("li")
        repoContainer.className = "repo-container"
        repoContainer.innerHTML = `
            <img src = ${repoObject.owner.avatar_url}></img>
            <div class = "flex-details">
                <p><strong>name:</strong> ${repoObject.name}</p>
                <p><strong>visibility:</strong> ${repoObject.visibility}</p
                <p><strong>description:</strong> ${repoObject.description}</p>
                <p><strong>language:</strong> ${repoObject.language}</p>
                <p><strong>repo link:</strong> <a href = "${repoObject.html_url}" target = "_blank">${repoObject.html_url}</p>
            </div>
        `
        document.querySelector("#user-list").style.display = "none"
        reposList.appendChild(repoContainer)
    }
    
})