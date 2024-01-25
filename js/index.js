document.addEventListener("DOMContentLoaded", ()=>{
    let url = ""
    getUserInput()
    function getUserInput (){
        let searchForm = document.querySelector("#github-form")
        searchForm.addEventListener("submit",(e)=>{
            e.preventDefault()
            let searchInput = document.querySelector("#search").value
            url = `https://api.github.com/search/users?q=${searchInput}`
            fetchUsers(url)
        })
    }


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
                console.log(userObject.login)
                console.log(userObject.repos_url)
                renderUsers(userObject.login)
                // renderRepos(userObject.repos_url)
            })
        })
    } 

    function renderUsers(user){
        // document.querySelector("#user-list").innerHTML = ""
        const userList = document.querySelector("#user-list")
        const userContainer = document.createElement("li")
        userContainer.textContent = user
        userList.appendChild(userContainer)
    }
    
})