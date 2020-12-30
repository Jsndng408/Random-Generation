import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useGlobalContext } from "../../context";
import GachaItem from './GachaItem';

function GachaSim() {
    const { characters, total, amount, clearCharacters, addCharacter, theme } = useGlobalContext();
    const [newChar, setNewChar] = useState("");
    const [newWeight, setNewWeight] = useState(0);

    function processNewItem() {
        characters.sort(function (a, b) {
            return a.id - b.id
        });
        let val = characters.reduce((lowest, num, i) => {
            let seqIndex = i + 1;
            return num.id !== seqIndex && seqIndex < lowest ? seqIndex : lowest
        }, characters.length + 1);
        addCharacter(val, newChar, parseInt(newWeight));
    }

    if (characters.length === 0) {
        return (
            <div className={theme}>
                <section className='characters'>
                    <header>
                        <h3>Gacha Simulator</h3>
                        <h4 className='empty-character-list'>No characters can be pulled</h4>
                    </header>
                    <Form.Group className='m-0'>
                        <Form.Control type='text' placeholder='Character Name' value={newChar}
                            onChange={e => setNewChar(e.target.value)} />
                        <Form.Control type='number' placeholder='1' value={newWeight}
                            onChange={e => setNewWeight(e.target.value)} />
                        <Button variant='outline-success' onClick={processNewItem}>
                            Add new Character
                    </Button>
                    </Form.Group>
                </section>
            </div>
        )
    }

    return (
        <div className={theme}>
            <section className='characters'>
                <header>
                    <h3>Gacha Simulator</h3>
                </header>
                <div>
                    {
                        characters.map((item) => {
                            return <GachaItem key={item.id} {...item} />
                        })
                    }
                </div>
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
                    <Form.Group className='m-0'>
                        <Form.Control type='text' placeholder='Character Name' value={newChar}
                            onChange={e => setNewChar(e.target.value)} />
                        <Form.Control type='number' placeholder='1' value={newWeight}
                            onChange={e => setNewWeight(e.target.value)} />
                        <Button variant='success' onClick={processNewItem}>
                            Add new Character
                        </Button>
                    </Form.Group>
                    <hr />
                    <button className='btn btn-danger' onClick={clearCharacters}>
                        Remove all Characters
                </button>
                </footer>
            </section>
        </div>
    )
}

export default GachaSim;