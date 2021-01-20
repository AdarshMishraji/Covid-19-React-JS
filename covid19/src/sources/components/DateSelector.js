import DatePicker from 'react-datepicker';
import './DateSelector.css';
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ onChangeCallBack, date }) => {
    return <div id='view' style={{ display: 'inline-block' }}>
        <DatePicker
            value={date ? date : null}
            onChange={(date) => onChangeCallBack(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)}
        />
    </div>
}

export default DateSelector;