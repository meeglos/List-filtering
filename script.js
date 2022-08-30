const input = document.querySelector('#searchInput')
const userList = document.querySelector('#users')
const results = document.querySelector('#results')
const urlFlag = "https://countryflagsapi.com/png/"
const url = "https://fakerapi.it/api/v1/persons?_quantity=15"

let users = []
let emailList = []

window.addEventListener('DOMContentLoaded', async () => {
  userList.innerHTML = "<h1>Loading...</h1>"
  const data = await loadUsers()
  users = data.data
  total = data.total
  renderUsers(users)
  displayResults(total)
})

input.addEventListener('keyup', e => {
  const newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()} ${user.email.toLowerCase()}`.includes(input.value.toLowerCase()))
  renderUsers(newUsers)
  displayResults(newUsers.length)
})

async function loadUsers() {
  const response = await fetch(url)
  return await response.json()
}

function displayResults(total) {
  results.innerHTML = "Mostrando <span class='text-red-500 '>&nbsp;" + total + " </span>&nbsp;resultados"
}

function renderUsers(users) {
  const itemsString = createUserItems(users)
  userList.innerHTML = itemsString
}

const createUserItems = users => users.map(getUserInfo).join('')

function getUserInfo(user) {
  const userFlag = getUserFlag(user)
  const userImage = getUserImage(user)
  
  return `
  <div class="relative">
    <a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative">
      <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${userImage}" alt="">
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${user.firstname} ${user.lastname}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${user.email}</p>
        <div class="flex flex-row items-center">
          <img class="h-5 w-6 mr-2" src="${userFlag}" alt="${user.address.country} country flag">
          <p class="font-normal text-gray-700 dark:text-gray-400">${user.address.country}</p>
        </div>            
      </div>
      <input id="default-checkbox" type="checkbox" value="${user.id}" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 absolute bottom-3 right-3">
    </a>
  </div>`
}

function getUserImage(user) {
  return userImage = user.image.replace(640,getRandomInt(621,694))
}

function getUserFlag(user) {
  let newname = user.address.country.split(' ').join('%20')
  let flag = urlFlag + newname
  return urlExists(flag) ? flag : urlFlag + user.address.county_code
}

function urlExists(flag) {
  var http = new XMLHttpRequest();
  http.open('GET', flag, false);
  http.send();
  return http.response.includes('Not Found') ? false : true
}

function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}