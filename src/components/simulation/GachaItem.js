import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useGlobalContext } from '../../context';

const GachaItem = ({ id, name, weight }) => {
    const { updateCharacter, removeCharacter, increaseWeight, decreaseWeight, total } = useGlobalContext();
    const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newWeight, setNewWeight] = useState(weight);

    const processUpdatedItem = () => {
        updateCharacter(id, newName, parseInt(newWeight));
    }

    const renderUpdateForm = () => {
        if (displayUpdateForm) {
            return (
                <Form>
                    <Form.Group className='m-0'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={newName}
                            onChange={e => setNewName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='m-0'>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control type='number' value={newWeight}
                            onChange={e => setNewWeight(e.target.value)} />
                    </Form.Group>
                    <Button className="btn btn-success" onClick={processUpdatedItem}>Make Changes</Button>
                </Form>
            );
        }
    }

    return (
        <article className='character-item'>
            <div className='column my-auto'>
                <button className='amount-btn' onClick={() => increaseWeight(id)}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
                    </svg>
                </button>

                <p className='amount'>{weight}</p>

                <button className='amount-btn' onClick={() => decreaseWeight(id)}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                        <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                </button>
            </div>
            <div className='column'>
                <h4>{name}</h4>
                <h4 className="weight">{parseFloat((weight / total) * 100).toFixed(4)}%</h4>
                <button className='btn btn-secondary item-btn' onClick={() => setDisplayUpdateForm(!displayUpdateForm)}>
                    Update
                </button>
                <button className='btn btn-danger item-btn' onClick={() => removeCharacter(id)}>
                    Remove
                </button>
                {renderUpdateForm()}
            </div>
        </article>
    )
}

export default GachaItem;