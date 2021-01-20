import { useReducer } from "react"
import covid19Data from "./sources/api/covid19Data";
import Button from "./sources/components/Button";
import CountrySelector from "./sources/components/CountrySelector"
import DateSelector from "./sources/components/DateSelector"
import VisualizeData from "./sources/components/VisualizeData";
import './App.css';

const fetchData = (value) => {
  let sno = 1;
  var data = [];
  let percentageIncreaseInConfirmed = null;
  let percentageIncreaseInActives = null;
  let percentageIncreaseInDeaths = null;
  let percentageIncreaseInRecoveries = null;
  let previousDayConfirms = 0;
  let previousDayActives = 0;
  let previousDayDeaths = 0;
  let previousDayRecoveries = 0;
  value.forEach(
    element => {
      if (sno == 1) {
        percentageIncreaseInConfirmed = previousDayConfirms;
        percentageIncreaseInActives = previousDayActives;
        percentageIncreaseInDeaths = previousDayDeaths;
        percentageIncreaseInRecoveries = previousDayRecoveries;
      }
      else {
        percentageIncreaseInConfirmed = (((element.Confirmed - previousDayConfirms) / previousDayConfirms) * 100).toFixed(2);
        percentageIncreaseInActives = (((element.Active - previousDayActives) / previousDayActives) * 100).toFixed(2);
        percentageIncreaseInDeaths = (((element.Deaths - previousDayDeaths) / previousDayDeaths) * 100).toFixed(2);
        percentageIncreaseInRecoveries = (((element.Recovered - previousDayRecoveries) / previousDayRecoveries) * 100).toFixed(2);
      }
      data.push(
        {
          sno: sno++,
          totalCases: element.Confirmed,
          actives: element.Active,
          deaths: element.Deaths,
          recoveries: element.Recovered,
          date: element.Date,
          percentageIncreaseInConfirmed: percentageIncreaseInConfirmed == 0 ? 0 : percentageIncreaseInConfirmed,
          percentageIncreaseInActives: percentageIncreaseInActives == 0 ? 0 : percentageIncreaseInActives,
          percentageIncreaseInDeaths: percentageIncreaseInDeaths == 0 ? 0 : percentageIncreaseInDeaths,
          percentageIncreaseInRecoveries: percentageIncreaseInRecoveries == 0 ? 0 : percentageIncreaseInRecoveries
        }
      )
      previousDayConfirms = element.Confirmed;
      previousDayActives = element.Active;
      previousDayDeaths = element.Deaths;
      previousDayRecoveries = element.Recovered;
    }
  )
  return data;
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'set_country': {
      console.log(action.payload);
      return { ...state, country: action.payload };
    }
    case 'set_from_date': {
      return { ...state, fromDate: action.payload };
    }
    case 'set_to_date': {
      return { ...state, toDate: action.payload };
    }
    case 'set_details': {
      return { ...state, details: action.payload };
    }
    default: {
      return state;
    }
  }
}

const App = () => {

  const [state, dispatch] = useReducer(
    reducer,
    {
      country: '',
      fromDate: null,
      toDate: null,
      details: []
    }
  );
  const { country, fromDate, toDate, details } = state;

  return <div id='body'>
    <h1 style={{ textAlign: 'center', backgroundColor: 'gray', borderRadius: '20px' }}>Covid 19</h1>

    <div id='header'>

      <div class='headerComponent'>

        <label>Country: </label>
        <br />
        <CountrySelector
          name={country}
          onChangeCallback={value => dispatch({ type: 'set_country', payload: value })}
        />

      </div>

      <div id='Line2'>
        <div>
          <label>From: </label>
          <DateSelector
            date={fromDate}
            onChangeCallBack={date => dispatch({ type: 'set_from_date', payload: date })}
          />
        </div>

        <div>
          <label> To: </label>
          <DateSelector
            date={toDate}
            onChangeCallBack={date => dispatch({ type: 'set_to_date', payload: date })}
          />
        </div>

        <Button
          isDisabled={country == '' || fromDate == null || toDate == null}
          onClickCallback={
            async () => {
              await covid19Data.get(`/country/${country}?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`)
                .then(
                  (value) => {
                    if (value.data.length == 0) {
                      alert('No data to display');
                    }
                    dispatch({ type: 'set_details', payload: fetchData(value.data) });
                  }
                )
                .catch(
                  (err) => {
                    console.error(err);
                    alert('Unable to fetch data.')
                  }
                )
            }
          }
        />
        {/* </div> */}
      </div>

    </div>
    <VisualizeData data={details} visibility={details.length != 0} />
  </div>
}

export default App;