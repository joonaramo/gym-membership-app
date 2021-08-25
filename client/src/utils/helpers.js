import axios from 'axios'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = `bearer ${token}`
  } else {
    delete axios.defaults.headers.common['authorization']
  }
}

export { classNames, setAuthToken }
