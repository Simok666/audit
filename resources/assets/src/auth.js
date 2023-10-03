class Auth {
  /*constructor() {

    let userData = window.localStorage.getItem('user')
    this.user = userData ? JSON.parse(userData) : null

    if (this.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
      
    }
  }*/

  login (user, accessMenu) {        
    window.localStorage.setItem('user', JSON.stringify(user))
    window.localStorage.setItem('accessMenu', JSON.stringify(accessMenu))

    EventCustom.$emit('userLoggedIn')
  }

  checkToken (route) {
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
    // axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    return axios.post('/AdminVue/check-token', { Url: route })
    .then(({data}) => {
      return data.status
    })
    .catch(({response}) => {
      return false
    })
	}

	logout() {
    //window.localStorage.setItem('user', null)
    window.localStorage.clear()
    EventCustom.$emit('userLoggedOut')

    axios.post('/AdminVue/logout')
    .then(function(){
      window.location.href = '/RoleAdmin/manage'
    })
    .catch(({response}) => {
      window.location.href = '/RoleAdmin/manage'
    })
	}

}

export default Auth