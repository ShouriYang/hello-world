import ajax from './ajax'
//指定服务器根地址
const BASE = 'http://122.51.175.158:7001'
const local = 'http://127.0.0.1:7002'
// export const reqUser = () => ajax(local + '/user', {})
export const register = (user) => ajax(local + '/register', user, 'POST')
export const login = (user) => ajax(local + '/login', user, 'POST')
export const reqProduct = (userId, page, pageSize) => ajax(BASE + '/product', { userId, page, pageSize })
export const searchProduct = (userId, target, page, pageSize) => ajax(BASE + '/product/search', { userId, target, page, pageSize })
export const addProduct = (userId, createPerson, product) => ajax(BASE + `/product?userId=${userId}&createPerson=${createPerson}`, product, 'POST')
export const editProduct = (productId, product) => ajax(BASE + `/product/${productId}`, product, 'PUT')
export const deleteProduct = (productId) => ajax(BASE + `/product/${productId}`, productId, 'DELETE')
export const reqProject = (productId, page, pageSize) => ajax(BASE + `/product/${productId}/project`, { page, pageSize })
export const searchProject = (productId, target, page, pageSize) => ajax(BASE + `/product/${productId}/project/search`, { target, page, pageSize })
export const addProject = (productId, project) => ajax(BASE + `/product/${productId}/project`, project, 'POST')
export const editProject = (projectId, project) => ajax(BASE + `/product/project/${projectId}`, project, 'PUT')
export const deleteProject = (projectId) => ajax(BASE + `/product/project/${projectId}`, projectId, 'DELETE')
export const reqVersion = (projectId, page, pageSize) => ajax(BASE + `/product/project/${projectId}/version`, { page, pageSize }, 'GET')
export const dayError = (projectId, date) => ajax(BASE + `/product/project/${projectId}/sort`, { date }, 'GET')
export const reqError = (versionId, page, pageSize) => ajax(BASE + `/product/project/version/${versionId}/errorList`, { page, pageSize }, 'GET')
export const datePickError = (versionId, date1, date2, page, pageSize) => ajax(BASE + `/product/project/version/${versionId}/errorList/sort`, { date1, date2, page, pageSize }, 'GET')




