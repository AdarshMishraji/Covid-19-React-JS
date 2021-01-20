import React, { useState, useEffect } from 'react';
import { Chart } from 'react-charts';
import Switch from "react-switch";

const Graph = ({ data, mode, visibility }) => {

    const [details, setDetails] = useState([]);
    const [graphMode, setGraphMode] = useState('TotalCases');

    useEffect(
        () => {
            console.log(mode, graphMode);
            if (mode == 'Confirmed' && graphMode == 'TotalCases')
                setDetails([
                    {
                        label: 'Confirmed Cases',
                        data: data.map(element => {
                            return [new Date(element.date), element.totalCases];
                        })
                    }
                ])
            else if (mode == 'Active' && graphMode == 'TotalCases')
                setDetails([
                    {
                        label: 'Active Cases',
                        data: data.map(element => {
                            return [new Date(element.date), element.actives];
                        })
                    },
                ])
            else if (mode == 'Deaths' && graphMode == 'TotalCases')
                setDetails([
                    {
                        label: 'Deaths',
                        data: data.map(element => {
                            return [new Date(element.date), element.deaths];
                        })
                    }
                ])
            else if (mode == 'Recovery' && graphMode == 'TotalCases')
                setDetails([
                    {
                        label: 'Recoveries',
                        data: data.map(element => {
                            return [new Date(element.date), element.recoveries];
                        })
                    }
                ])
            else if (mode == 'Confirmed' && graphMode == 'PercentageIncrease')
                setDetails([
                    {
                        label: 'Confirmed Cases',
                        data: data.map(element => {
                            return [new Date(element.date), element.percentageIncreaseInConfirmed];
                        })
                    }
                ])
            else if (mode == 'Active' && graphMode == 'PercentageIncrease')
                setDetails([
                    {
                        label: 'Active Cases',
                        data: data.map(element => {
                            return [new Date(element.date), element.percentageIncreaseInActives];
                        })
                    },
                ])
            else if (mode == 'Deaths' && graphMode == 'PercentageIncrease')
                setDetails([
                    {
                        label: 'Deaths',
                        data: data.map(element => {
                            return [new Date(element.date), element.percentageIncreaseInDeaths];
                        })
                    }
                ])
            else if (mode == 'Recovery' && graphMode == 'PercentageIncrease')
                setDetails([
                    {
                        label: 'Recoveries',
                        data: data.map(element => {
                            return [new Date(element.date), element.percentageIncreaseInRecoveries];
                        })
                    }
                ])
        },
        [mode, visibility, data, graphMode]
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'time', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    return <div
        style={{
            width: '1000px',
            height: '500px',
            padding: 10,
            display: visibility ? 'inline-block' : 'none',
            marginLeft: '100px'
        }}
    >
        <label style={{ marginBottom: '20px', display: 'inline-block', textAlign: 'center', width: '75%' }}>
            <span style={{ width: '250px', display: 'inline-block' }} > Percentage Gain </span>
            <Switch onChange={() => setGraphMode(graphMode == 'TotalCases' ? 'PercentageIncrease' : 'TotalCases')} checkedIcon={false} uncheckedIcon={false} checked={graphMode == 'PercentageIncrease' ? false : true} />
            <span style={{ width: '250px', display: 'inline-block' }} > Number of Cases </span>
        </label>
        <Chart data={details} tooltip axes={axes} />
    </div>
}

export default Graph;