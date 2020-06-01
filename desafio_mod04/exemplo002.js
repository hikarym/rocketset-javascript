// Crie uma tela com um <input> que deve receber o nome de um usuário no Github. Após digitar o
// nome do usuário e clicar no botão buscar a aplicação deve buscar pela API do Github (conforme
// URL abaixo) os dados de repositórios do usuário e mostrá-los em tela:
// URL de exemplo: https://api.github.com/users/diego3g/repos
// Basta alterar "diego3g" pelo nome do usuário.
var usuarioElement = document.querySelector('input[name=user]')
var reposElement = document.querySelector('#repos')
var urlGithub = 'https://api.github.com/users/'

function getRepos(user){
    return new Promise(function (resolve, reject){
        var xhr = new XMLHttpRequest()
        xhr.open('GET',`https://api.github.com/users/${user}/repos`)
        xhr.send(null)

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject('Erro na requisicao')
                }
            }
        }
    });
}

function buscarRepos(){
    var user = usuarioElement.value
    getRepos(user)
        .then(function(response){
            reposElement.innerHTML = ''
            for (const repo of response) {
                var repoElement = document.createElement('li')            
                var nameRepoElement = document.createTextNode(repo.name)            
                repoElement.appendChild(nameRepoElement)
                reposElement.appendChild(repoElement)
            }
        })
        .catch(function(error){
            console.warn(error)
        })
}
