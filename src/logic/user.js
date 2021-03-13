const method = obj => (
    {
        users : (localStorage.getItem('users') && JSON.parse(localStorage.getItem('users'))) || [],
        // setUsers : (users) => { obj.setState( state => ({ users, }))}
        
    }
)

export default method;