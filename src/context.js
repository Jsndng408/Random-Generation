import React, { useState, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { gachaData } from './data/objectGachaData';

const [light, dark] = ['light-theme', 'dark-theme'];

const getStorageTheme = () => {
    let theme = light;
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
    }
    return theme;
}

const AppContext = React.createContext();

const initialState = {
    loading: false,
    characters: gachaData,
    total: 0,
    amount: 0,
};

const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState(getStorageTheme());
    const [modalState, setModalState] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [data, setData] = useState(gachaData);

    /* Theme-related functions */
    function toggleTheme() {
        if (theme === light) {
            setTheme(dark);
        } else {
            setTheme(light);
        }
    }

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    /* Modal window-related functions */
    const openModal = () => {
        setModalState(true);
    }

    const closeModal = () => {
        setModalState(false);
    }

    /* Reducer-related functions */
    const clearCharacters = () => {
        dispatch({
            type: 'CLEAR_CHARACTERS'
        });
    };

    const addCharacter = (id, name, weight) => {
        dispatch({
            type: 'ADD',
            payload: {
                id: id,
                name: name,
                weight: (isNaN(weight) ? 1 : weight)
            }
        });
        dispatch({
            type: 'GET_TOTALS'
        });
    }

    const removeCharacter = (id) => {
        dispatch({
            type: 'REMOVE',
            payload: id
        });
    };

    const increaseWeight = (id) => {
        dispatch({
            type: 'INCREASE',
            payload: id
        });
    };

    const decreaseWeight = (id) => {
        dispatch({
            type: 'DECREASE',
            payload: id
        });
    };

    const toggleWeight = (id, type) => {
        dispatch({
            type: 'TOGGLE_AMOUNT',
            payload: { id, type }
        });
    };

    /* Each time characters and/or their weights change */
    useEffect(() => {
        dispatch({
            type: 'GET_TOTALS'
        });
    }, [state.characters]);

    return (
        <AppContext.Provider value={{
            ...state,
            theme,
            modalState,
            data,
            setData,
            toggleTheme,
            openModal,
            closeModal,
            clearCharacters,
            addCharacter,
            removeCharacter,
            increaseWeight,
            decreaseWeight,
            toggleWeight,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }