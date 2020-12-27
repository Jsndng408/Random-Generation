import React from 'react';
import {useGlobalContext} from '../../context';

export const About = () => {
    const {theme} = useGlobalContext();

    return (
        <div className={theme}>
            <p>About Page</p>
        </div>
    );
}