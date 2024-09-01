// import './css/fonts.css';
import '../css/login-form.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from "../context/global-context";
import getUsers from '../services/getUsers';
import closeLoginForm from '../services/closeLoginForm';
import openRegisterForm from '../services/openRegisterForm';
import CloseBtn from './closeBtn';
import DarkFace from './darkFace';

const LOGINNAME_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const LOGINPASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#*$%]).{8,24}$/;
// const REGISTER_URL = '/register';

const LoginForm = () => {
    // let userLoginContext=useContext(UserLoginContext);
    let globalContext=useContext(GlobalContext);
    
    let [loginName, setLoginName] = useState("");
    let [loginPass, setLoginPass] = useState("");
    const [loginNameFocus, setLoginNameFocus] = useState(false);
    const [loginPassFocus, setLoginPassFocus] = useState(false);

    const [validLoginName, setValidLoginName] = useState(false);
    const [validLoginPass, setValidLoginPass] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);


    useEffect(()=>{
        getUsers(globalContext);
    },[globalContext?.usersList])


    useEffect(() => {
        setErrMsg("");
    }, [loginName,loginPass])

    useEffect(() => {
        setValidLoginName(LOGINNAME_REGEX.test(loginName));
    }, [loginName])

    useEffect(() => {
        setValidLoginPass(LOGINPASS_REGEX.test(loginPass));
    }, [loginPass])

    useEffect(()=>{
        if (loginSuccess){
            closeLoginForm(globalContext);
            console.log("welcom");
            setLoginName("");
            setLoginPass("");    
        }
    },[loginSuccess])
    
    const handleLoginSubmit= async(e:any)=>{
        e.preventDefault();
        const v1 = LOGINNAME_REGEX.test(loginName);
        const v2 = LOGINPASS_REGEX.test(loginPass);
        if (!v1 || !v2) {
            setErrMsg("مقادیر وارد شده نامعتبر است");
            return;
        }
        checkUserInfo();
    }
    useEffect(()=>{
        if (globalContext?.loginCheck===true){
            setLoginSuccess(true);
        }
        console.log(globalContext?.loginCheck);
    },[globalContext?.loginCheck])
    function checkUserInfo(){
        for(let item of globalContext?.usersList!){
            console.log(item);
            let found;
            if(loginName===item.email){
                if(loginPass===item.pass){
                    globalContext?.setLoggedInUser(item);
                    globalContext?.setLoginCheck(true);
                    found=true;
                    setErrMsg("");
                }else{
                    found="wrong";
                    setErrMsg("ایمیل یا گذرواژه درست نیست!");
                }
            }
            if(found===true || found==="wrong"){
                break;
            }else{
                setErrMsg("کاربری با این مشخصات یافت نشد !");
            }



            try {
                // در اینجا اطلاعات رو با اکسیوس پاس میدیم به سرور
            } catch (error) {
                // اگر خطایی وجود داشت اینجا دریافت میشه
            }
    
        }
    }

    return ( 
            <div className={`${globalContext?.loginFormState? "show-flex":"close"} login-form-container position-absolute justify-content-center align-items-center`} >
                <DarkFace func={()=>{closeLoginForm(globalContext)}} />
                <div className='bg-light position-relative d-flex flex-column border rounded p-3 shadow gap-3 login-form-body'>
                    <div className="m-0 p-0 d-flex flex-row justify-content-end">
                        <CloseBtn func={()=>{closeLoginForm(globalContext)}} />
                    </div>
                    <div className="login-form-main">
                        <form onSubmit={handleLoginSubmit}>
                            <p className={errMsg ? "show" : "close"}>{errMsg}</p>
                            <label htmlFor="login-user-name" className='mb-2 d-flex flex-row gap-1 align-items-center'>
                                <span>ایمیل</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className={loginNameFocus && !validLoginName ? "bi bi-x-circle-fill show" : "bi bi-x-circle-fill close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={validLoginName ? "bi bi-check-circle-fill show" : "bi bi-check-circle-fill close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </label>
                            <input id='login-user-name' type="email" value={loginName} onChange={(e)=>{setLoginName(e.target.value)}} className='form-control' autoComplete='off' aria-describedby='login-name-note'  onFocus={()=>setLoginNameFocus(true)} onBlur={()=>setLoginNameFocus(false)}/>
                            <div id='login-name-note' className={`${loginNameFocus && !validLoginName ? 'show' : 'close'} note`}>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                    </svg>
                                    پسورد وارد شده معتبر نیست
                                    <br />
                                    لطفا از حروف انگلیسی استفاده کنید .
                                </p>
                            </div>
                            <br />
                            <label htmlFor="login-user-password" className='mb-2 d-flex flex-row gap-1 align-items-center'>
                                <span>رمز عبور</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className={loginPassFocus && !validLoginPass ? "bi bi-x-circle-fill show" : "bi bi-x-circle-fill close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={validLoginPass ? "bi bi-check-circle-fill show" : "bi bi-check-circle-fill close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </label>
                            <input id='login-user-password' type="password" value={loginPass} onChange={(e)=>{setLoginPass(e.target.value)}} className='form-control' aria-describedby='login-pass-note' onFocus={()=>setLoginPassFocus(true)} onBlur={()=>setLoginPassFocus(false)}/>
                            <div id='login-pass-note' className={`${loginPassFocus && !validLoginPass ? 'show' : 'close'} note`}>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                    </svg>
                                    پسورد وارد شده معتبر نیست
                                    <br />
                                    لطفا از حروف انگلیسی استفاده کنید .
                                </p>
                            </div>
                            <button className='btn btn-primary mt-3' disabled={!validLoginName || !validLoginPass ? true : false}>ورود به حساب</button>
                        </form>
                    </div>
                    <div className="login-form-options">
                        <p>حساب کاربری ندارید؟
                            <span onMouseDown={function(){
                                closeLoginForm(globalContext);
                                openRegisterForm(globalContext);
                            }}> ثبت نام کنید !</span>
                        </p>
                    </div>
                </div>
            </div>
    );
}

 
export default LoginForm;