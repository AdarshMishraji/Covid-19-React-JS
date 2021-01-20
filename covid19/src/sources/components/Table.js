import { useEffect, useState } from "react";
import './Table.css';

const Table = ({ data, onModeChange, mode, visibility }) => {

    const [rows, setRows] = useState([]);

    useEffect(
        () => {
            let tempRows = [];
            switch (mode) {
                case 'Confirmed': {
                    data.forEach(
                        element => {
                            tempRows.push(
                                <tr>
                                    <td>{element.sno}</td>
                                    <td>{element.totalCases}</td>
                                    <td>{element.date.substr(0, 10)}</td>
                                    <td>{element.percentageIncreaseInConfirmed}</td>
                                </tr>
                            )
                        }
                    )
                    break;
                }
                case 'Active': {
                    data.forEach(
                        element => {
                            tempRows.push(
                                <tr>
                                    <td>{element.sno}</td>
                                    <td>{element.actives}</td>
                                    <td>{element.date.substr(0, 10)}</td>
                                    <td>{element.percentageIncreaseInActives}</td>
                                </tr>
                            )
                        }
                    )
                    break;
                }
                case 'Deaths': {
                    data.forEach(
                        element => {
                            tempRows.push(
                                <tr>
                                    <td>{element.sno}</td>
                                    <td>{element.deaths}</td>
                                    <td>{element.date.substr(0, 10)}</td>
                                    <td>{element.percentageIncreaseInDeaths}</td>
                                </tr>
                            )
                        }
                    )
                    break;
                }
                case 'Recovery': {
                    data.forEach(
                        element => {
                            tempRows.push(
                                <tr>
                                    <td>{element.sno}</td>
                                    <td>{element.recoveries}</td>
                                    <td>{element.date.substr(0, 10)}</td>
                                    <td>{element.percentageIncreaseInRecoveries}</td>
                                </tr>
                            )
                        }
                    )
                    break;
                }
                default: {
                    tempRows = [];
                }
            }
            setRows(tempRows);
        }, [mode, visibility, data]
    )

    return <div id='tableView' style={{ display: visibility ? 'inline-block' : 'none' }}>
        <table style={{ height: '550px', overflowY: 'scroll', display: 'block' }}>
            <thead id='thead'>
                <tr>
                    <th> Sno </th>
                    <select
                        id='modeSelector'
                        onChange={
                            value => {
                                onModeChange(value.target.value);
                            }
                        }
                    >
                        <option key='confirm' value='Confirmed' selected> Total Cases </option>
                        <option key='active' value='Active'> Active Cases </option>
                        <option key='death' value='Deaths'> Deaths </option>
                        <option key='recovery' value='Recovery'> Recovery </option>
                    </select>
                    <th> Date </th>
                    <th> Increase (%) </th>
                </tr>
            </thead>
            <tbody id='tbody'>
                {rows}
            </tbody>
        </table>
    </div>
}

export default Table;