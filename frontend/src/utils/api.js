/* eslint-disable */ 
import axios from "axios";
const http = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});

export default {
  auth(url = 'users') {
    return {
        login: ({email, password}) => {
          return http.post(url + '/login/', {email, password})
        },
        register: ({email, name, password}) => http.post(url + '/signUp/', {email, name, password}),
        logout: () => http.get(url + '/logout')
    }
  },

  map(url = 'map') {
      const config = {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };

      return {
          fetchAll: () => http.get(url + '/list', config),
          fetchById: id => http.get(url + "/" + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
          delete: id => http.delete(url + "/" + id, config)
      }
  },

  user(url = 'tasks/') {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('mypegtoken')
        }
      };

      return {
          fetchAll: () => http.get(url , config),
          fetchById: id => http.get(url + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id,updatedRecord) => http.patch(url+id, updatedRecord, config),
          delete: id => http.delete(url+id, config)
      }
  }

}