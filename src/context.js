import React, { useState, useContext, useEffect } from 'react';

const [light, dark] = ['light-theme', 'dark-theme'];

const getStorageTheme = () => {
    let theme = light;
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
    }
    return theme;
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState(getStorageTheme());

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

    return (
        <AppContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }