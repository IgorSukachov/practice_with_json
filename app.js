const list = document.querySelector('#list')
const filter = document.querySelector('#filter')

let USERS = []

filter.addEventListener('input', (e) => {
    // console.log(e.target.value)
    // Можно написать так const { value } = e.target
    const value = e.target.value.toLowerCase()
    const filteredUsers = USERS.filter((user) => {
        return user.name.toLowerCase().includes(value) // Если name совпадает с тем, что мы вводим, то мы выводим пользователя под инпутом.
        // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false.
    })
    render(filteredUsers)
})

async function start() {
    list.innerHTML = 'Loading...' // Это если данные ещё не загрузились, мы показываем это поле
    try {
        const response = await fetch( 'https://jsonplaceholder.typicode.com/users', {
            method: 'Get'
        }) // fetch возвращает нам промис, если это промис, нам нужно применить к нему оператор await
        console.log(response) // status: 200 это говорит, что ошибки нет, значит значения переданы, теперь их нужно привести в вид c помощью метода json(), который приводит ответ с сервера в формат json.
        const data = await response.json() // Обязательно пишем await , потому что если его не прописать, то код выполнится быстрее, чем придут данные с сервера и выдаст пустой promise (pendeing), pending переводится как "в ожидании"
        console.log(data) // всё, мы получили массив с объектами
        USERS = data // записываем в массив данные с сервера
        render(data)
    } catch (err) {
        list.style.color = 'red'
        list.innerHTML = err.message
    }
}

function render(users = []) { // render - воссоздавать, предоставлять
    // Каждый полученный элемент из массиваа, нам нужно привести к строчке. И в виде Html положить во внутрь <li> элемента
    if (users.length === 0) { // Если ничего не найдено, то выдаём сообщение пользователю
        list.innerHTML = 'No matched users!'
    } else {
        const html = users.map(toHTML).join('') // Каждый элемент массива будет поподать в функцию toHTML
        list.innerHTML = html // В html мы записали массив, который приводится к строке и соединяются запятыми, поэтому выше добавим метод join('')
    }
} // Здесь мы получаем массив с пользлвателями. По умолчанию задаём пустой массив

function toHTML(user) { // Функция, которая будет приводить в определенный вид шаблона, который мы передадим и будет работать с нашими полученными данными
    return `
        <li class='list-group-item'>${user.name}</li>
    `
}

start()