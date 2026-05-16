const axios = require('axios')

axios.get('https://json.geoiplookup.io/')
  .then(response => {
    console.log('Status:', response.status)
    console.log('Data:', response.data)
  })
  .catch(error => {
    console.log('Error:', error.message)
  })
