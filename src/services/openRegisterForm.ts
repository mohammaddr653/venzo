import { GlobalContextInterface } from "../context/global-context";

const openRegisterForm=(globalContext:GlobalContextInterface|null)=>{
    globalContext?.setRegisterFormState(true)
    document.body.style.overflowY="hidden";
}
export default openRegisterForm;