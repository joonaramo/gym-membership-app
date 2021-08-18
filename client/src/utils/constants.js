const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://whispering-waters-22674.herokuapp.com/api';

export { API_URL };
