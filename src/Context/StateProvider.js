import React, {createContext, useContext, useReducer} from 'react'



export const StateContext = createContext();



export const StateProvider = ({Reducer, initialstate, children}) => (
    <StateContext.Provider value={useReducer(Reducer, initialstate)}>
        {children}
    </StateContext.Provider>
                                                                                        
  
);
export const useStateValue = () => useContext(StateContext);
