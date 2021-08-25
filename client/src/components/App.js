import React, { useEffect, useState } from 'react'
import Header from './Header'
import Router from './Router'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { loadUser } from '../actions/auth'
import { getSettings } from '../actions/settings'
import { setAuthToken } from '../utils/helpers'
import CreateSettings from './AdminPanel/Settings/CreateSettings'
import Loading from './UI/Loading'

const App = ({ loadUser, settings, getSettings, loading }) => {
  const [loadingState, setLoadingState] = useState(true)
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  useEffect(() => {
    loadUser()
    getSettings()
  }, [])

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoadingState(false)
      }, 1000)
    }
  }, [loading])

  if (loading || loadingState) {
    return <Loading fullScreen={true} />
  }

  if (!settings) {
    return <CreateSettings />
  }

  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => ({
  settings: state.settings.settings,
  loading: state.settings.loading,
})

export default connect(mapStateToProps, { loadUser, getSettings })(App)
