export default function Winner(props){

    return (
        <div className="winner">
        <div className="winner-inner">
          <h1> You won!</h1>
          <div className="text-light">
            <span className="text-warning">Number of Rolls:</span>{" "}
            {props.rollsCount}
          </div>
          <div className="text-light">
            <span className="text-warning">Time Taken:</span>{" "}
            {props.formatTimeDifference(props.endTime - props.startTime)}
          </div>
          <div className="text-light">
            <span className="text-warning">Your Highest Score:</span>{" "}
            {props.bestRolls.rolls} Rolls
          </div>


          { props.rollsCount <= props.bestRolls.rolls && 
                    <div className="text-primary">
                    Congrats! You Broke your highest score of rolls!
                  </div>
        }

        </div>
      </div>    )
}