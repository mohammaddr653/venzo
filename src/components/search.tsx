import { useEffect ,useContext} from 'react';
import { useState } from 'react';
import { GlobalContext } from '../context/global-context';
import '../css/search.css';
import { Posts } from '../context/global-context';
import getPosts from '../services/getPosts';
const Search = () => {
    const globalContext=useContext(GlobalContext);
    const [searchData, setSearchData] = useState<Posts[]|null>(null);

    useEffect(()=>{
        getPosts(globalContext);
    },[globalContext?.posts])

    function explore(e:any,data:any,parameter:any):void{
        let value= e.currentTarget.value.toLowerCase();
        let array=[];
        for(let item of data){
            if(item[`${parameter}`].toString().includes(value.toString())&&value !==""&&value !==" "){
                console.log(item);
                array.push(item);
            }
        }
        setSearchData([...array]);
    }


    return (
        <div className="search-container h-100 position-relative">
            <div className="search-box d-flex h-100 flex-row align-items-streach border rounded overflow-hidden">
                <span className=' d-flex align-items-center justify-content-center px-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </span>
                <input type="text" className='search-input border-0 w-100 ps-3 outlined-0' placeholder='جستجو' onChange={(e)=>{explore(e,globalContext?.posts,'title')}}/>
                <div className="search-result-box border position-absolute shadow rounded mt-1 w-100 p-3">
                    <div className="search-box-head">
                        <p>نتایج جستجو : <span className='search-box-counter'></span></p>
                    </div>
                    <ul className="search-box-main list-group rounded-0 d-flex flex-column gap-2">
                        {searchData?.map((item,index)=>{
                            return(
                                <li key={index} className='list-group-item p-0 border-0 rounded-0'>
                                    <a href="" className=" d-flex flex-row align-items-center gap-2 py-2 border-top">
                                        <img src={item.img} alt="" />
                                        <h5 className=' m-0'>{item.title}</h5>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>

    )
}

 
export default Search;