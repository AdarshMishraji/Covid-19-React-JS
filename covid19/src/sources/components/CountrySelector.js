import covid19Api from '../api/covid19Data';
import './CountrySelector.css';
import { useEffect, useState } from 'react';

const CountrySelector = ({ name, onChangeCallback }) => {
    const [countries, setCountries] = useState([]);
    const fetchData = async () => {
        await covid19Api.get('/countries')
            .then(
                (value) => {
                    value.data.sort((a, b) => { return a.Country.localeCompare(b.Country) })
                    setCountries(value.data.map(
                        element => {
                            return <option key={element.Slug} value={JSON.stringify({ key: element.Slug, value: element.Country })}> {element.Country} </option>
                        }
                    ))
                }
            )
            .catch(
                (err) => {
                    console.log('Unable to fetch data.');
                }
            )
    }
    useEffect(
        () => {
            fetchData();
        }, []
    )

    return <div style={{ display: 'inline-block' }}>
        <select
            onChange={(country) => onChangeCallback(JSON.parse(country.target.value).key)}
            onSelect={(country) => onChangeCallback(JSON.parse(country.target.value).key)}
        >
            <option value=''>Select Country</option>
            {countries}
        </select>
    </div>
}

export default CountrySelector;