import { GlobalContextInterface } from "../context/global-context";

const closeLoginForm=(globalContext:GlobalContextInterface|null)=>{
    globalContext?.setLoginFormState(false)
    document.body.style.overflowY="scroll";
}
export default closeLoginForm;