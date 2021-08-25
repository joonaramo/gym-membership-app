import axios from 'axios'
import { API_URL } from '../utils/constants'

const get = async (membershipId) => {
  const { data } = await axios.get(`${API_URL}/memberships/${membershipId}`)
  return data
}

const getAll = async (page, limit) => {
  const { data } = await axios.get(`${API_URL}/memberships`, {
    params: {
      page,
      limit,
    },
  })
  return data
}

const update = async (membershipId, membershipData) => {
  const { data } = await axios.put(
    `${API_URL}/memberships/${membershipId}`,
    membershipData
  )
  return data
}

const create = async (membershipData) => {
  const { data } = await axios.post(`${API_URL}/memberships`, membershipData)
  return data
}

const remove = async (membershipId) => {
  await axios.delete(`${API_URL}/memberships/${membershipId}`)
}

const membershipsService = {
  get,
  getAll,
  update,
  create,
  remove,
}

export default membershipsService
