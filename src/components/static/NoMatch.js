import React from 'react';
import {useGlobalContext} from '../../context';

export const NoMatch = () => {
    const {theme} = useGlobalContext();

    return (
        <div className={`px-2 ${theme}`}>
            <p>You reached a dead end.</p>
        </div>
    );
}