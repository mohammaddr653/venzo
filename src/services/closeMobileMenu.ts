import { GlobalContextInterface } from "../context/global-context";

const closeMobileMenu=(globalContext:GlobalContextInterface|null)=>{
    globalContext?.setMobileMenuState(false)
    document.body.style.overflowY="scroll";
}
export default closeMobileMenu;