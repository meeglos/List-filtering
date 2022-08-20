const input = document.querySelector('#searchInput')
const userList = document.querySelector('#users')

let users = []

window.addEventListener('DOMContentLoaded', async () => {
  userList.innerHTML = "<h1>Loading...</h1>"
  const data = await loadUsers()
  users = data.data
  renderUsers(users)
})


input.addEventListener('keyup', e => {
  const newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()} ${user.email.toLowerCase()}`.includes(input.value.toLowerCase()))
  renderUsers(newUsers)
})

async function loadUsers() {
  const response = await fetch('https://fakerapi.it./api/v1/users?_quantity=1000')
  return await response.json()
}

const createUserItems = users => users.map(user => `
<li class="my-2 py-2 rounded-lg bg-zinc-100 text-thin flex flex-row items-center justify-center hover:bg-yellow-200">
  <div class="flex justify-end mr-1 md:mr-6 font-medium capitalize px-1">${user.firstname} ${user.lastname} </div>
  <div class="flex items-center font-thin"><i class="fa-solid fa-envelope text-red-500 mr-1"></i> ${user.email}</div>
</li>`).join(' ')

function renderUsers(users) {
  const itemsString = createUserItems(users)
  userList.innerHTML = itemsString
}