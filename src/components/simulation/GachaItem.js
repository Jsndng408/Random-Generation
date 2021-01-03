import React from 'react';
import { useGlobalContext } from '../../context';

const GachaItem = ({ id, name, weight }) => {
    const { removeCharacter, increaseWeight, decreaseWeight, total } = useGlobalContext();

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
                <button className='btn btn-danger item-btn' onClick={() => removeCharacter(id)}>
                    Remove
                </button>
            </div>
        </article>
    )
}

export default GachaItem;