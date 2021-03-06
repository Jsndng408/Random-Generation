import React, { useState, useContext, useEffect } from 'react';
import { GachaData } from './components/simulation/GachaData';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [data, setData] = useState(GachaData);
    const [total, setTotal] = useState(200);
    const [amount, setAmount] = useState(8);

    /* Gacha Item-related functions */
    const clearCharacters = () => {
        setData([]);
        setTotal(0);
        setAmount(0);
    };

    const addCharacter = (id, name, weight) => {
        let tempData = data;
        tempData.push({
            id: id,
            name: name,
            weight: ((isNaN(weight) || weight <= 0) ? 1 : weight)
        });
        setData(tempData.filter((item) => item.weight > 0));
    };

    const updateCharacter = (id, name, weight) => {
        let tempData = data;
        let itemToUpdate = tempData.find((element) => element.id === id);
        itemToUpdate.name = name;
        itemToUpdate.weight = ((isNaN(weight) || weight <= 0) ? 1 : weight);
        setData(tempData.filter((item) => item.weight > 0));
    }

    const removeCharacter = (id) => {
        let tempData = data.filter((item) => item.id !== id);
        setData(tempData);
    };

    const increaseWeight = (id) => {
        let tempData = data;
        let item = tempData.find((item) => item.id === id);
        item.weight += 1;
        setData(tempData.filter((item) => item.weight > 0));
    };

    const decreaseWeight = (id) => {
        let tempData = data;
        let item = tempData.find((item) => item.id === id);
        item.weight -= 1;
        setData(tempData.filter((item) => item.weight > 0));
    };

    /* Each time characters' weights change */
    useEffect(() => {
        let tempAmt = 0, tempTotal = 0;
        for (let i = 0; i < data.length; i++) {
            tempAmt += 1;
            tempTotal += data[i].weight;
        }
        setTotal(tempTotal);
        setAmount(tempAmt);
    }, [data]);

    return (
        <AppContext.Provider value={{
            data,
            total,
            amount,
            setData,
            setTotal,
            setAmount,
            clearCharacters,
            addCharacter,
            updateCharacter,
            removeCharacter,
            increaseWeight,
            decreaseWeight,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }