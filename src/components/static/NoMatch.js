import React from 'react';
import {useGlobalContext} from '../../context';

export const NoMatch = () => {
    const {theme} = useGlobalContext();

    return (
        <div className={theme}>
            <p>You reached a dead end.</p>
        </div>
    );
}