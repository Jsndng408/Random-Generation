import React from 'react';
import {useGlobalContext} from '../../context';

export const Home = () => {
    const {theme} = useGlobalContext();

    return (
        <div className={`px-2 ${theme}`}>
            <p>Welcome to my web application.</p>
        </div>
    );
}