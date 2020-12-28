import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useGlobalContext } from '../../context';
import { gachaData, totalWeight } from '../../data/gachaData';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';

export const GachaSim = () => {
    const { theme } = useGlobalContext();
    const [trials, setTrials] = useState(0);
    const [results, setResults] = useState([]);
    const [runningTotals, setRunningTotals] = useState([]);

    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
        handleRolls(formDataObj["myInput"]);
    }

    const getResult = (threshold) => {
        let cumulative = 0;
        for (let range = 0; range < gachaData.length; ++range) {
            cumulative += gachaData[range][1];
            if (cumulative >= threshold) {
                return gachaData[range][0];
            }
        }
    };

    const handleRolls = (rolls) => {
        if (isNaN(rolls) || rolls < 0) {
            rolls = 10;
        }
        setTrials(rolls); // Asynchronous, so using useEffect on trials for a dependency array would allow it to work properly
    };

    const resetPulls = () => {
        setTrials(0);
    };

    useEffect(() => {
        let tempResults = [];
        for (let i = 0; i < trials; i++) {
            let item = getResult(Math.floor(Math.random() * totalWeight));
            const found = tempResults.find(char => char.name === item);
            if (found) {
                found["y"] += 1;
            } else {
                tempResults.push({
                    name: item,
                    y: 1
                });
            }
        }
        setResults(tempResults);
    }, [trials]);

    useEffect(() => {
        let tempResults = runningTotals;
        for (let i = 0; i < results.length; i++) {
            let item = results[i];
            const found = runningTotals.find(char => char.name === item.name);
            if (found) {
                found["y"] += item.y;
            } else {
                tempResults.push({
                    name: item.name,
                    y: item.y
                });
            }
        }
        setRunningTotals(tempResults);
        // eslint-disable-next-line
    }, [results]);

    const options = {
        chart: {
            type: "pie"
        },
        title: {
            text: "Gacha Pulls"
        },
        series: [
            {
                data: results
            }
        ]
    };

    const options2 = {
        chart: {
            type: "pie"
        },
        title: {
            text: "Gacha Pulls - Total"
        },
        series: [
            {
                data: runningTotals
            }
        ]
    };

    return (
        <div className={`px-2 ${theme}`}>
            <h3>Gacha Simulation</h3>
            <InputGroup className='mb-3'>
                <Form inline onSubmit={onFormSubmit}>
                    <Form.Control type="number" name="myInput" />
                    <InputGroup.Append>
                        <Button variant="secondary" type="submit">Make Pulls</Button>
                    </InputGroup.Append>
                </Form>
            </InputGroup>

            <Button variant="info" onClick={resetPulls}>Reset Roll</Button>
            <hr />
            <PieChart highcharts={Highcharts} options={options} />
            <PieChart highcharts={Highcharts} options={options2} />
        </div>
    );
}
