export default function Die(props){
    let bgcolor = props.held? '#59e390':'white';

    return (
        <div className='die' style={{backgroundColor:bgcolor}} onClick={()=>props.clickHandler(props.index)}>{props.value}</div>
    )
}