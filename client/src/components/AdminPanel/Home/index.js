import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../actions/user'
import { getMemberships } from '../../../actions/membership'
import {
  UserGroupIcon,
  CreditCardIcon,
  UserAddIcon,
} from '@heroicons/react/outline'
import Uncaptured from './Uncaptured'
import Overview from './Overview'

const Home = ({ setCurrent }) => {
  const [cards, setCards] = useState([])
  const user = useSelector((state) => state.user)
  const order = useSelector((state) => state.order)
  const { memberships } = useSelector((state) => state.membership)
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrent('Home')
    dispatch(getUsers(1, 1))
    dispatch(getMemberships())
  }, [])

  useEffect(() => {
    const activeMemberships = memberships.filter(
      (membership) => new Date(membership.end_date) > new Date()
    )
    const cards = [
      {
        name: 'Users',
        href: '/admin/users',
        icon: UserGroupIcon,
        amount: user.totalDocs,
      },
      {
        name: 'Uncaptured orders',
        href: '/admin/orders',
        icon: CreditCardIcon,
        amount: order.totalDocs,
      },
      {
        name: 'Active memberships',
        href: '/admin/memberships',
        icon: UserAddIcon,
        amount: activeMemberships.length,
      },
    ]
    setCards(cards)
  }, [user, order, memberships])

  return (
    <>
      <Overview cards={cards} />
      <Uncaptured />
    </>
  )
}

export default Home
