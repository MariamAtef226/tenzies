export default function Winner(){

    return (
        <div className='die' style={{backgroundColor:bgcolor}} onClick={()=>props.clickHandler(props.index)}>{props.value}</div>
    )
}