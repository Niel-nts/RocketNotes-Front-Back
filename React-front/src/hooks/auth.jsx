import { createContext, useContext, useState, useEffect } from "react";
import { json } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [data, setData] = useState({})

    async function signIn({email, password}){
        try {
            const response = await api.post(
                "/sessions",
                {email, password})
            const {user, token} = response.data

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@rocketnotes:token", JSON.stringify(token))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({user, token})
                
        } catch(error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Não foi possível realizar o login")
            }
        }
    }

    function signOut(){
        localStorage.removeItem("@rocketnotes:token")
        localStorage.removeItem("@rocketnotes:user")

        setData({})
    }

    async function updateProfile({user, avatarFile}){
        try{
            if(avatarFile){
                const fileUploadForm = new FormData()
                fileUploadForm.append("avatar", avatarFile)

                const response = await api.patch("/users/avatar", fileUploadForm)
                user.avatar = response.data.avatar
            }
            await api.put("/users", user)
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            setData({user, token: data.token})
            alert("Perfil atualizado")

        } catch(error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Não foi possível atualizar o perfil")
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@rocketnotes:user")
        const token = localStorage.getItem("@rocketnotes:token")

        if(token && user){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }
    }, [])

    async function sendNewNote(title, description, tags, links){
        
        try{            
            await api.post("/notes", {
                title,
                description,
                tags,
                links
            })
            alert("Nota criada com sucesso")
            

        } catch(error) {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Nota não cadastrada")
            }
        }
    }

    return(
        <AuthContext.Provider value={{
            signIn, 
            user: data.user, 
            signOut,
            updateProfile,
            sendNewNote
            }}>
            {children}
        </AuthContext.Provider>
    )   
}

function useAuth(){
    const context = useContext(AuthContext)
    return context
}

export {AuthProvider, useAuth}