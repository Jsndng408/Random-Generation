import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useGlobalContext } from '../../context';
import GachaItem from './GachaItem';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';

export const GachaSim = () => {
    const { data, total, amount, clearCharacters, addCharacter } = useGlobalContext();
    const [trials, setTrials] = useState(0);
    const [results, setResults] = useState([]);
    const [runningTotals, setRunningTotals] = useState([]);
    const [newChar, setNewChar] = useState("");
    const [newWeight, setNewWeight] = useState(1);

    // Handle submission for pulling
    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries());
        handleRolls(formDataObj["myInput"]);
    }

    // Pick out the character that will be rolled for
    const getResult = (threshold) => {
        let cumulative = 0;
        for (let range = 0; range < data.length; ++range) {
            cumulative += data[range].weight;
            if (cumulative >= threshold) {
                return data[range].name;
            }
        }
    };

    // Process number of rolls to do
    const handleRolls = (rolls) => {
        if (isNaN(rolls) || rolls < 0) {
            rolls = 10;
        }
        setTrials(rolls); // Asynchronous, so using useEffect on trials for a dependency array would allow it to work properly
    };

    // Update the Chart with the results of the roll
    useEffect(() => {
        let tempResults = [];
        for (let i = 0; i < trials; i++) {
            let item = getResult(Math.floor(Math.random() * total));
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
        if (tempResults.length > 0) {
            setResults(tempResults);
            setTrials(0);
        }
        // eslint-disable-next-line
    }, [trials]);

    // Update the total Chart with the results of the roll
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

    // Chart configurations
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

    // Add new character to the data
    function processNewItem() {
        data.sort(function (a, b) {
            return a.id - b.id
        });
        let val = data.reduce((lowest, num, i) => {
            let seqIndex = i + 1;
            return num.id !== seqIndex && seqIndex < lowest ? seqIndex : lowest
        }, data.length + 1);
        addCharacter(val, newChar, parseInt(newWeight));
    }

    const renderInsertForm = () => {
        return (
            <Form.Group className='m-0'>
                <h4 className="text-center">Add New Item</h4>
                <Form.Control type='text' placeholder='Character Name' value={newChar}
                    onChange={e => setNewChar(e.target.value)} />
                <hr />
                <Form.Control type='number' value={newWeight}
                    onChange={e => setNewWeight(e.target.value)} />
                <hr />
                <Button variant='outline-success' onClick={processNewItem}>Add new Character</Button>
            </Form.Group>
        )
    }

    const renderEmpty = () => {
        if (data.length === 0) {
            return (
                <div>
                    <h4 className='empty-character-list'>No characters can be pulled</h4>
                    {renderInsertForm()}
                </div>
            );
        } else {
            return (
                <div>
                    {
                        data.map((item) => {
                            return <GachaItem key={item.id} {...item} />
                        })
                    }
                    {renderInsertForm()}
                    <footer>
                        <hr />
                        <div className='total-weight'>
                            <h4>
                                Number of Different Options to Pull<span>{amount}</span>
                            </h4>
                            <h4>
                                Total Weight<span>{total}</span>
                            </h4>
                        </div>
                        <hr />
                        <button className='btn btn-danger' onClick={clearCharacters}>
                            Remove all Characters
                        </button>
                    </footer>
                </div>
            );
        }
    }

    return (
        <div className="character-pulls">
            <h3 className="text-center">Gacha Simulation</h3>
            <InputGroup className='mb-3'>
                <Form inline className="m-auto" onSubmit={onFormSubmit}>
                    <label>
                        <span>Enter number of Items you want to Pull: </span><Form.Control type="number" name="myInput"  />
                    </label>
                    <InputGroup.Append>
                        <Button variant="secondary" type="submit">Make Pulls</Button>
                    </InputGroup.Append>
                </Form>
            </InputGroup>

            <hr />
            <PieChart highcharts={Highcharts} options={options} />
            <PieChart highcharts={Highcharts} options={options2} />

            <hr />
            <h4 className="text-center">Options for Pulling</h4>
            {renderEmpty()}
        </div>
    );
}

// <Button variant="info" onClick={openModal}>Edit Form Items</Button>