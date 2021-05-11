if (process.env.NODE_ENV === 'production') {
  module.exports = {
    api: 'https://geo-ecom-server.herokuapp.com/api',
    generatePubicUrl: (file_name) => {
      return `https://geo-ecom-server.herokuapp.com/public/${file_name}`
    }
  }
} else {
  module.exports = {
    api: 'http://localhost:2000/api',
    generatePubicUrl: (file_name) => {
      return `http://localhost:2000/public/${file_name}`
    }
  }

}
