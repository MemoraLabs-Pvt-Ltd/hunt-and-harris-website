import App from './App.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import PayOnlinePage from './pages/PayOnlinePage.jsx'

export const routes = [
  { path: '/', element: <App /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/pay-online', element: <PayOnlinePage /> },
]
