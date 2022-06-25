import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NoticeBoard } from './components/noticeboard/notice'
import { Login } from './components/profile/login'
import { Register } from './components/profile/register'

function App() {
  const user = useSelector((state) => state.authReducer.AuthReducer.loginUser)
  console.log("user",user)
  return (
    <div className="App">
      <Routes>
          <Route exact path='/login' element={ <Login/> } />
          <Route exact path='/register' element={ <Register /> } />
          <Route exact path='/noticeboard' element={ user ? <NoticeBoard /> : <Login /> } />
      </Routes>
    </div>
  )
}

export default App
