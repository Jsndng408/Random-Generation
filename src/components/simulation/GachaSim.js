import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import { gachaData, totalWeight } from '../../data/gachaData';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';

export const GachaSim = () => {
    const { theme } = useGlobalContext();
    const [trials, setTrials] = useState(0);
    const [results, setResults] = useState([]);

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
    }

    return (
        <div className={theme}>
            <h3>Gacha Simulation</h3>
            <button onClick={() => handleRolls(10)}>Make Roll</button>
            <button onClick={resetPulls}>Reset Roll</button>
            <PieChart highcharts={Highcharts} options={options} />
        </div>
    );
}