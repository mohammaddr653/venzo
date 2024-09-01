import { useContext, useEffect , useState } from "react";
import { GlobalContext } from "./context/global-context";
import Header from "./components/header";
const HomePage=()=>{
    const globalContext=useContext(GlobalContext);
    return(
        <Header></Header>
    )
}
export default HomePage;