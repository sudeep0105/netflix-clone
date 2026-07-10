import { useState, useEffect } from 'react'
import './App.css'
import Row from './row.jsx'
import requests from './requests.js'

function App() {
  const [isLoginView, setIsLoginView] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [bannerMovie, setBannerMovie] = useState(null)

  // Fetch a random banner movie whenever a user logs in successfully
  useEffect(() => {
    if (loggedInUser) {
      async function fetchBanner() {
        try {
          const response = await fetch(requests.fetchTrending)
          const data = await response.json()
          if (data.results && data.results.length > 0) {
            const randomIdx = Math.floor(Math.random() * data.results.length)
            setBannerMovie(data.results[randomIdx])
          }
        } catch (e) {
          console.error("Failed to load banner data:", e)
        }
      }
      fetchBanner()
    }
  }, [loggedInUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')
    setIsSuccess(false)

    // Validate email domain restriction to match backend rules
    const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.com$/
    if (!emailRegex.test(email)) {
      setIsSuccess(false)
      setMessage("We only support registrations from official domains (gmail, yahoo, outlook, hotmail)")
      return
    }

    // Retrieve local users
    const users = JSON.parse(localStorage.getItem('netflix_users') || '[]')

    if (isLoginView) {
      // Handle login flow
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!existingUser) {
        setIsSuccess(false)
        setMessage('Account not found! Try switching to Sign Up first.')
        return
      }
      if (existingUser.password !== password) {
        setIsSuccess(false)
        setMessage('Incorrect password. Please try again.')
        return
      }
      // Successful Login
      setIsSuccess(true)
      setLoggedInUser({ email })
    } else {
      // Handle registration flow
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase())
      if (userExists) {
        setIsSuccess(false)
        setMessage('This email is already registered! Try signing in.')
        return
      }
      // Save new user
      users.push({ email, password })
      localStorage.setItem('netflix_users', JSON.stringify(users))

      setIsSuccess(true)
      setMessage('Account created successfully! You can now Sign In.')
      setEmail('')
      setPassword('')
      setIsLoginView(true)
    }
  }

  // Text truncation helper to keep the description layout balanced
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string
  }

  // --- DASHBOARD VIEW LAYER ---
  if (loggedInUser) {
    return (
        <div className="netflix-dashboard">
          {/* Navigation Header bar */}
          <nav className="netflix-nav">
            <h1 className="netflix-logo" style={{ margin: 0, fontSize: '1.8rem' }}>NETFLIX</h1>
            <div className="nav-right">
              <span className="user-email">{loggedInUser.email}</span>
              <button className="signout-btn" onClick={() => { setLoggedInUser(null); setBannerMovie(null); }}>Sign Out</button>
            </div>
          </nav>

          {/* Dynamic Big Hero Banner */}
          {bannerMovie && (
              <header
                  className="netflix-banner"
                  style={{
                    backgroundSize: "cover",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(17, 17, 17, 1)), url("https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                  }}
              >
                <div className="banner-contents">
                  <h1 className="banner-title">
                    {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
                  </h1>
                  <div className="banner-buttons">
                    <button className="banner-btn play">Play</button>
                    <button className="banner-btn list">My List</button>
                  </div>
                  <p className="banner-description">
                    {truncate(bannerMovie?.overview, 160)}
                  </p>
                </div>
              </header>
          )}

          {/* Dynamic Movie Rows populated by TMDB */}
          <div className="dashboard-rows" style={{ backgroundColor: '#111', marginTop: bannerMovie ? '0px' : '80px' }}>
            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow={true}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </div>
        </div>
    )
  }

  // --- AUTH ENTRY GATE LAYER ---
  return (
      <div className="netflix-container">
        <div className="netflix-card">
          <h1 className="netflix-logo">NETFLIX</h1>
          <h2>{isLoginView ? 'Sign In' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <div className="input-group">
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <button type="submit" className="netflix-btn">
              {isLoginView ? 'Sign In' : 'Register'}
            </button>
          </form>

          <div className="view-toggle">
            {isLoginView ? (
                <p>New to Netflix? <span onClick={() => { setIsLoginView(false); setMessage(''); }}>Sign up now.</span></p>
            ) : (
                <p>Already have an account? <span onClick={() => { setIsLoginView(true); setMessage(''); }}>Sign in now.</span></p>
            )}
          </div>

          {message && (
              <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
                {message}
              </div>
          )}
        </div>
      </div>
  )
}

export default App