
const user = localStorage.getItem('user');
const parse = JSON.parse(user)

export default user === null ? '' : parse['token'];