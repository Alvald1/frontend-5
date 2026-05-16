import axios from 'axios'

const result = document.getElementById('result')

document.getElementById('btn-vk').addEventListener('click', async () => {
  try {
    const response = await axios.get('https://vk.com')
    result.textContent = 'Status: ' + response.status
  } catch (error) {
    result.textContent = 'Error: ' + error.message
  }
})

document.getElementById('btn-geo').addEventListener('click', async () => {
  try {
    const response = await axios.get('https://json.geoiplookup.io/')
    result.textContent = JSON.stringify(response.data, null, 2)
  } catch (error) {
    result.textContent = 'Error: ' + error.message
  }
})
