import axios from 'axios'
const Main_Url = "http://localhost:8080/api/"
export const postUser=(data)=>{
    return axios.post(`${Main_Url}postUser`, data);
}
export const login=(data)=>{
    return axios.post(`${Main_Url}login`, data);
}  
export const getUsers=(data)=>{
    return axios.get(`${Main_Url}getUsers`);
}  
export const deleteUser=(id)=>{
    return axios.delete(`${Main_Url}deleteUser/${id}`);
}  
export const editUser=(id,data)=>{
    return axios.put(`${Main_Url}editUser/${id}`,data);
}  