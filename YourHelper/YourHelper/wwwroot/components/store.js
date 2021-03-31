﻿import React, {useState, useReducer } from 'react';
import notifacationsReducer from "./reducers/notifacationsReducer";
import diaryReducer from "./reducers/diaryReducer";
import noteReducer from "./reducers/noteReducer";

var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};


export const ReducerContext = React.createContext();

const Store = ({children}) => {

    const initialState = {
        diary: {
            date: new Date().toLocaleString("ru", options),
            dates: []
        },
        notifications: {
            notificationMessage: '',
            notification: ''
        },
        note: {
            addNote: 'hide',
            editNote: 'hide',
            editNoteData: {},
            filter: 'hide',
            notesVisible: '',
            actionVisible: '',
            filterSelect: 'Все',
            importantOnly: false,
            token: false
        }
    };

    const reducer = (state, action) => {
        let tempState = {...state}
        
        tempState.diary = diaryReducer(tempState.diary, action);
        tempState.notifications = notifacationsReducer(tempState.notifications, action);
        tempState.note = noteReducer(tempState.note, action);
        
        return tempState;
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    
    return(
        <ReducerContext.Provider value={value}>
            {children}
        </ReducerContext.Provider>
    );

}

export default Store;
