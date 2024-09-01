import {createContext,Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface User{
    id:number,
    name:string,
    email:string,
    pass:string,
    img:string
}
interface FirstClassMenu{
    title:string,
    tag:string
}
export interface Posts{
    title:string,
    id:number,
    img:string,
    date:Date
}

export interface GlobalContextInterface{
    loggedInUser:User|null,
    setLoggedInUser: Dispatch<SetStateAction<User|null>>,
    firstClassMenu:FirstClassMenu|null,
    setFirstClassMenu:Dispatch<SetStateAction<FirstClassMenu|null>>,
    posts:Posts[]|null,
    setPosts:Dispatch<SetStateAction<Posts[]|null>>,
    loginFormState:boolean ,
    setLoginFormState:Dispatch<SetStateAction<boolean>>,
    registerFormState:boolean ,
    setRegisterFormState:Dispatch<SetStateAction<boolean>>,
    loginCheck:boolean ,
    setLoginCheck:Dispatch<SetStateAction<boolean>>,
    usersList:User[]|null,
    setUsersList: Dispatch<SetStateAction<User[]|null>>,
    mobileMenuState:boolean ,
    setMobileMenuState:Dispatch<SetStateAction<boolean>>

}

export const GlobalContext = createContext<GlobalContextInterface|null>(null)

interface GlobalContextProviderProps{
    children:ReactNode;
}

export default function GlobalContextProvider({children}:GlobalContextProviderProps){
    const [loggedInUser,setLoggedInUser] = useState<User|null>({
        "id":1,
        "name":"محمد امین درخشنده",
        "email":"mohammaddr653@gmail.com",
        "pass":"Dr7370**",
        "img":"/images/IMG_20230218_205148.jpg"
    });
    const [firstClassMenu,setFirstClassMenu] = useState<FirstClassMenu|null>(null);
    const [posts,setPosts] = useState<Posts[]|null>(null);
    let [loginFormState , setLoginFormState] = useState<boolean>(false);
    let [registerFormState , setRegisterFormState] = useState<boolean>(false);
    const[loginCheck,setLoginCheck]=useState<boolean>(false);
    const[usersList,setUsersList]=useState<User[]|null>(null);
    let [mobileMenuState , setMobileMenuState] = useState<boolean>(false);






    return(
        <GlobalContext.Provider value={{mobileMenuState , setMobileMenuState,loggedInUser,setLoggedInUser,firstClassMenu,setFirstClassMenu,posts,setPosts,loginFormState , setLoginFormState,registerFormState , setRegisterFormState,loginCheck,setLoginCheck,usersList,setUsersList}}>
            {children}
        </GlobalContext.Provider>
    )
}
