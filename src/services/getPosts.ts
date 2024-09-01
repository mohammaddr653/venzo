import axios from "axios";
import { Posts } from "../context/global-context";
import { GlobalContextInterface } from "../context/global-context";

class PostClass{
    constructor(public title:string,public id:number,public img:string,public date:Date){}
}
const getPosts=(globalContext:GlobalContextInterface|null)=>{
    if(globalContext?.posts===null){
        async function getData(){
            let array:Posts[]=[];
            const response = await axios.get("/api/posts.json");
            response.data.map((item:Posts)=>{
                let date=new Date(item.date);
                array.push(new PostClass(item.title,item.id,item.img,date))
            })
            array.sort((a:Posts,b:Posts)=>b.date.getTime() - a.date.getTime());
            globalContext?.setPosts(array);
        }
        getData();
    }else{
        console.log(globalContext?.posts);
    }
}
export default getPosts;