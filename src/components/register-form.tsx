// import './css/fonts.css';
import '../css/register-form.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { GlobalContext } from '../context/global-context';
import closeRegisterForm from '../services/closeRegisterForm';
import CloseBtn from './closeBtn';
import DarkFace from './darkFace';
const REGISTERNAME_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTERPASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = '/register';


const RegisterForm = () => {
    // const mobMenuContext = useContext(MobMenuContext);
    let globalContext=useContext(GlobalContext);
    let [registerName, setRegisterName] = useState("");
    let [registerPass, setRegisterPass] = useState("");
    let [registerPassAgain, setRegisterPassAgain] = useState("");

    const [registerNameFocus, setRegisterNameFocus] = useState(false);
    const [registerPassFocus, setRegisterPassFocus] = useState(false);
    const [registerPassAgainFocus, setRegisterPassAgainFocus] = useState(false);


    const [validRegisterName, setValidRegisterName] = useState(false);
    const [validRegisterPass, setValidRegisterPass] = useState(false);
    const [validRegisterPassAgain, setValidRegisterPassAgain] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);


    useEffect(() => {
        setErrMsg("");
    }, [registerName,registerPass])

    useEffect(() => {
        setValidRegisterName(REGISTERNAME_REGEX.test(registerName));
    }, [registerName])

    useEffect(() => {
        setValidRegisterPass(REGISTERPASS_REGEX.test(registerPass));
    }, [registerPass])

    useEffect(() => {
        setValidRegisterPassAgain(registerPassAgain===registerPass && REGISTERPASS_REGEX.test(registerPass));
    }, [registerPassAgain])


    useEffect(()=>{
        if (registerSuccess){
            closeRegisterForm(globalContext);
            alert("welcom");
        }
    },[registerSuccess])
    
    const handleRegisterSubmit= async(e:any)=>{
        e.preventDefault();
        const v1 = REGISTERNAME_REGEX.test(registerName);
        const v2 = REGISTERPASS_REGEX.test(registerPass);
        if (!v1 || !v2) {
            setErrMsg("مقادیر وارد شده نامعتبر است");
            return;
        }
        setRegisterName("");
        setRegisterPass("");
        setRegisterSuccess(true);
        try {
            // در اینجا اطلاعات رو با اکسیوس پاس میدیم به سرور
        } catch (error) {
            // اگر خطایی وجود داشت اینجا دریافت میشه
        }
    }
    return (  
        <>
            <div className={`${globalContext?.registerFormState ? "show-flex" : "close"} register-form-container position-absolute justify-content-center align-items-center`}>
                <DarkFace func={()=>{closeRegisterForm(globalContext)}}/>
                <div className='bg-light position-relative d-flex flex-column border rounded p-3 shadow gap-3 register-form-body'>
                    <div className="m-0 p-0 d-flex flex-row justify-content-end">
                        <CloseBtn func={()=>{closeRegisterForm(globalContext)}} />
                    </div>
                    <div className="register-form-main">
                        <form onSubmit={handleRegisterSubmit}>
                            <p className={errMsg ? "show" : "close"}>{errMsg}</p>
                            <label htmlFor="register-user-name" className='mb-2 d-flex flex-row gap-1 align-items-center'>
                                <span>ایمیل</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className={registerNameFocus && !validRegisterName ? "show" : "close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={validRegisterName ? "show" : "close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </label>
                            <input id='register-user-name' type="email" value={registerName} onChange={(e)=>{setRegisterName(e.target.value)}} className='form-control' autoComplete='off' aria-describedby='register-name-note'  onFocus={()=>setRegisterNameFocus(true)} onBlur={()=>setRegisterNameFocus(false)}/>
                            <div id='register-name-note' className={`${registerNameFocus && !validRegisterName ? 'show' : 'close'} note`}>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                    </svg>
                                    ایمیل وارد شده معتبر نیست
                                    <br />
                                </p>
                            </div>
                            <br />
                            <label htmlFor="register-user-password" className='mb-2 d-flex flex-row gap-1 align-items-center'>
                                <span>رمز عبور</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className={registerPassFocus && !validRegisterPass ? "show" : "close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={validRegisterPass ? "show" : "close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </label>
                            <input id='register-user-password' type="password" value={registerPass} onChange={(e)=>{setRegisterPass(e.target.value)}} className='form-control' aria-describedby='register-pass-note' onFocus={()=>setRegisterPassFocus(true)} onBlur={()=>setRegisterPassFocus(false)}/>
                            <div id='register-pass-note' className={`${registerPassFocus && !validRegisterPass ? 'show' : 'close'} note`}>
                                <p className='m-0'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                    </svg>
                                    پسورد وارد شده معتبر نیست
                                    <br />
                                    پسورد شما باید دارای حداقل 8 کاراکتر و شامل حروف کوچک و بزرگ ، عدد و حداقل یکی از نماد های !@#$% باشد
                                </p>
                            </div>
                            <br />


                            <label htmlFor="register-user-password-again" className='mb-2 d-flex flex-row gap-1 align-items-center'>
                                <span>تکرار رمز عبور</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className={registerPassAgainFocus && !validRegisterPassAgain ? "show" : "close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={validRegisterPassAgain ? "show" : "close"} viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </label>
                            <input id='register-user-password-again' type="password" value={registerPassAgain} onChange={(e)=>{setRegisterPassAgain(e.target.value)}} className='form-control' onFocus={()=>setRegisterPassAgainFocus(true)} onBlur={()=>setRegisterPassAgainFocus(false)}/>



                            <button className='btn btn-primary mt-3' disabled={!validRegisterName || !validRegisterPass || !validRegisterPassAgain ? true : false}>ورود به حساب</button>
                        </form>
                    </div>
                    <div className="row register-form-options">
                        <p>قبلا ثبت نام کرده اید؟
                            <span onMouseDown={function(){
                                closeRegisterForm(globalContext);
                                globalContext?.setLoginFormState(true);
                                document.body.style.overflowY="hidden";
                            }}> وارد شوید!</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

 
export default RegisterForm;