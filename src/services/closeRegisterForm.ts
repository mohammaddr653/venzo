import { GlobalContextInterface } from "../context/global-context";

const closeRegisterForm=(globalContext:GlobalContextInterface|null)=>{
    globalContext?.setRegisterFormState(false)
    document.body.style.overflowY="scroll";
}
export default closeRegisterForm;