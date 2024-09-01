import { useContext} from "react";
import { GlobalContext } from "../context/global-context";
import openLoginForm from "../services/openLoginForm";
import '../css/header.css'
import Search from "./search";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { Link } from "react-router-dom";
import MobileMenu from "./mobile-menu";
import openMobileMenu from "../services/openMobileMenu";
import closeMobileMenu from "../services/closeMobileMenu";
import DarkFace from "./darkFace";
const Header=()=>{
    const globalContext=useContext(GlobalContext);
    return(
        <header>
            <div id="header-container" className="container-fluid position-fixed d-flex flex-column p-0">
                <div className="px-2 px-lg-5 py-2 d-flex flex-row justify-content-between align-items-streach">
                    <div className="d-flex flex-row justify-content-start w-100 gap-5 align-items-center">
                        <img src="/images/logo.svg" alt="logo" />
                        <div className="m-0 p-0 d-none w-100 h-100 d-lg-flex">
                            <Search></Search>
                        </div>
                    </div>
                    <div className="d-lg-flex d-none header-left-account flex-row justify-content-end align-items-center gap-5">
                        {globalContext?.loginCheck?
                        <Link to={`/account/${globalContext.loggedInUser?.id}`} className="d-flex rounded flex-row align-items-center gap-2 hoverable p-1">
                            <img src={globalContext.loggedInUser?.img} alt="" />
                            <span className="text-nowrap user-name">{globalContext.loggedInUser?.name}</span>
                        </Link>
                        :
                        
                        <button className="btn" onClick={()=>{openLoginForm(globalContext)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        </button>


                        }
                    </div>
                    <button className="d-flex btn d-lg-none header-left-hmbrgr p-1 rounded" onClick={()=>{openMobileMenu(globalContext)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
                <div className="bg-danger px-2 px-lg-5">sfs</div>
                <LoginForm></LoginForm>
                <RegisterForm></RegisterForm>
                {/* <div className={`${globalContext?.mobileMenuState?"show":"close"} position-absolute dark-face`} onClick={()=>{closeMobileMenu(globalContext)}}></div> */}
                <DarkFace func={()=>{closeMobileMenu(globalContext)}} showCondition={globalContext!.mobileMenuState}/>
                <MobileMenu/>
            </div>
        </header>
    )
}
export default Header;