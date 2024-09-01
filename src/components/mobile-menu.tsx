import '../css/mobile-menu.css';
import { GlobalContext } from '../context/global-context';
import { useContext } from 'react';
import CloseBtn from './closeBtn';
import closeMobileMenu from '../services/closeMobileMenu';
const MobileMenu=()=>{
    const globalContext=useContext(GlobalContext);
    return(
        <div id="mobile-menu-container" className={`${globalContext?.mobileMenuState?"mobile-menu-show":"mobile-menu-close"} bg-primary d-flex flex-column position-absolute`}>
            <div className="bg-danger m-0 p-0">
                <CloseBtn func={()=>{closeMobileMenu(globalContext)}}/>
            </div>
        </div>
    );
}
export default MobileMenu;
