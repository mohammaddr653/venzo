import axios from "axios";
import { GlobalContextInterface } from "../context/global-context";

const getUsers=(globalContext:GlobalContextInterface|null)=>{
    if(globalContext?.usersList===null){
        async function getData(){
            const response = await axios.get("/api/usersList.json");
            globalContext?.setUsersList(response.data);
        }
        getData();
    }else{
        console.log(globalContext?.usersList);
    }
}
export default getUsers;