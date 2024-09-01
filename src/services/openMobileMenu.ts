import { GlobalContextInterface } from "../context/global-context";

const openMobileMenu=(globalContext:GlobalContextInterface|null)=>{
    globalContext?.setMobileMenuState(true)
    document.body.style.overflowY="hidden";
}
export default openMobileMenu;