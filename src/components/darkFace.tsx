import '../css/darkFace.css';

interface Props{
    func:Function;
    showCondition?: boolean;
}

const DarkFace=(props:Props)=>{
    return(
        <div className={`${props.showCondition===undefined || props.showCondition===true ?"show":"close"} position-absolute dark-face`} onClick={()=>{props.func()}}></div>
    );
}
export default DarkFace;