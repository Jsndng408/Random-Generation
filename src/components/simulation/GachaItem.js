import React from 'react';
import { useGlobalContext } from '../../context';

const GachaItem = ({ id, name, weight }) => {
    const { removeCharacter, toggleWeight, total } = useGlobalContext();

    return (
        <article className='character-item'>
            <div>
                <h4>{name}</h4>
                <h4>{parseFloat((weight / total) * 100).toFixed(4)}%</h4>
                <button className='btn btn-danger' onClick={() => removeCharacter(id)}>
                    Remove
                </button>
            </div>
            <div>
                <button className='btn btn-info' onClick={() => toggleWeight(id, 'inc')}>
                    Increase Weight
                </button>

                <p className='weight'>{weight}</p>

                <button className='btn btn-secondary' onClick={() => toggleWeight(id, 'dec')}>
                    Decrease Weight
                </button>
            </div>
        </article>
    )
}

export default GachaItem;