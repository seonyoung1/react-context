import React from 'react';
import AppContextProvider from "./context";
import List from "./components/List";
import Form from "./components/Form";
import Controls from "./components/Controls";

const App = () => {
    return (
        <AppContextProvider>
            <List />
            <Form />
            <Controls />
        </AppContextProvider>
    );
};

export default App;
