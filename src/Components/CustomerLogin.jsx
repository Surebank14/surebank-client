import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {loginRequest} from '../redux/slices/loginSlice'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {error,loading} = useSelector((state)=>state.login)
    const [credentials,setCredentials] = useState({phone:'',password:''})

    const handleChange = (e) => {
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data ={credentials,navigate}
        dispatch(loginRequest(data))
    }
    return(
        <div className="mt-20 flex items-center justify-center bg-gray-100 p-4 sm:p-0">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* phone input */}
            <input
              type="phone"
              name="phone"
              placeholder="phone"
              value={credentials.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Password input */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
  
            {/* Login Button */}
            {loading ? (
                        <button type="button" className="w-full p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center" disabled>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Loading"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="opacity-25"
                                />
                                <path
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    className="opacity-75"
                                />
                            </svg>
                            Processing...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                    )}
          </form>
        </div>
      </div>
       
    )
}

export default Login