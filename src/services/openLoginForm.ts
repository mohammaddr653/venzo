import { GlobalContextInterface } from "../context/global-context";

const openLoginForm=(globalContext:GlobalContextInterface|null)=>{
    globalContext?.setLoginFormState(true)
    document.body.style.overflowY="hidden";
}
export default openLoginForm;