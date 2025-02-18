import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const {dispatch} = useAuthContext()

    const login = async (username,password,type) => {
        setLoading(true)
        setError(null)

        try{
            const response = await fetch('/api/user/login',{
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username,password,type})
            })
            const json = await response.json()
    
            if(!response.ok){
                setLoading(false)
                setError(json.error)
            }
    
            if(response.ok){
                localStorage.setItem('user',JSON.stringify(json))
    
                dispatch({type: 'LOGIN',payload: json})
    
                setLoading(false)
            }
        }catch(err){
            setError(err.message);
        }

        
    }

    return {login,loading,error}
}