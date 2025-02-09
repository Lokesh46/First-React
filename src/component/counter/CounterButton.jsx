import { PropTypes } from 'prop-types'
import './counter.css'

export default function CounterButton({by, incMethod, decMethod}){
    return(
        <div className="Counter">
            <div>
                <button className="counterButton" onClick={() => incMethod(by)}>+{by}</button>
                <button className="counterButton" onClick={() => decMethod(by)}>-{by}</button>
            </div>
        </div>
    )
}


CounterButton.propTypes = {
    by: PropTypes.number
}

