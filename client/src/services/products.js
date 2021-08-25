import axios from 'axios'
import { API_URL } from '../utils/constants'

const get = async (productId) => {
  const { data } = await axios.get(`${API_URL}/products/${productId}`)
  return data
}

const getAll = async (page, limit) => {
  const { data } = await axios.get(`${API_URL}/products`, {
    params: {
      page,
      limit,
    },
  })
  return data
}

const update = async (productId, productData) => {
  const { data } = await axios.put(
    `${API_URL}/products/${productId}`,
    productData
  )
  return data
}

const create = async (productData) => {
  const { data } = await axios.post(`${API_URL}/products`, productData)
  return data
}

const remove = async (productId) => {
  await axios.delete(`${API_URL}/products/${productId}`)
}

const productsService = {
  get,
  getAll,
  update,
  create,
  remove,
}

export default productsService
