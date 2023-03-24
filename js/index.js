document.addEventListener("DOMContentLoaded", () => {

const inputBox = document.querySelector('#search');
const submitBtn = document.getElementById('submit')

let submittedUserName = '';
const userList = document.querySelector('#user-list')
const repoList = document.getElementById('repos-list')

submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    repoList.innerHTML = '';
    userList.innerHTML ='';
    submittedUserName = inputBox.value;
//console.log(submittedUserName)
    inputBox.value = '';

    const configurationObject = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json"
        },
      }
  
      fetch(`https://api.github.com/search/users?q=${submittedUserName}`,configurationObject)
        .then (function(response){
          return response.json();
        })
        .then (function(convertedResponse){
//console.log(convertedResponse)

            const gitUserArray = Object.values(convertedResponse.items);
//console.log(gitUserArray)

            for(let i = 0; i < gitUserArray.length; i++){
              const gitUser = gitUserArray[i];
//console.log(gitUser)
                userList.innerHTML = userList.innerHTML +
                `
                <div>
                <h3 class='user_name'>${gitUser.login}</h3>
                <img class='user_image' src="${gitUser.avatar_url}"/>
                </div>
                &nbsp
                &nbsp
                &nbsp
                &nbsp
                &nbsp
                `
            }

            const watchUsers = userList.getElementsByClassName('user_image');
//console.log(watchUsers)
                    for(let i = 0;i < watchUsers.length;i++){
                      const gitUser = gitUserArray[i];
                      watchUsers[i].addEventListener('click', function(){
                        repoList.innerHTML = '';
console.log("We just clicked!")
                      fetch(`https://api.github.com/users/${gitUser.login}/repos`,configurationObject)
                      .then (function(response){
                        return response.json();
                      })
                      .then (function(convertedResponse){
//console.log(convertedResponse)
                      const gitRepoArray = Object.values(convertedResponse);
                        gitRepoArray.forEach(repo => {
//console.log(repo)
                          repoList.innerHTML = repoList.innerHTML +
                            `
                            <li>
                            <h5 class='user_repo'>${repo.name}</h5>
                            </li>
                            `
                        })
                      
                        //Fetch 2 Closing
                        })
                    
        //Fetch 1 Closing
        })}

//SubmitBtn Listener Event Closing
})


//DOMContentLoaded Closing
})})
