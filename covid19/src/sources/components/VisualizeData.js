import Graph from "./Graph";
import Table from "./Table";
import { useState } from 'react';
import './VisualizeData.css';

const VisualizeData = ({ data, visibility }) => {

    const [mode, setMode] = useState('Confirmed');
    console.log(mode);

    return <div style={{ hidden: visibility ? 'block' : 'none' }}>
        <div id='innerView'>
            <Graph data={data} visibility={visibility} mode={mode} />
            <Table data={data} visibility={visibility} mode={mode} onModeChange={(mode) => setMode(mode)} />
        </div>
    </div>
}

export default VisualizeData;