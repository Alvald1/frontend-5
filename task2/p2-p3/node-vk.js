const axios = require('axios')

axios.get('https://vk.com')
  .then(response => {
    console.log('Status:', response.status)
    console.log('Headers:', response.headers)
  })
  .catch(error => {
    console.log('Error:', error.message)
  })
