import React, {useState, useContext} from 'react';

const AppContext = React.createContext();

const AppContextProvider = ({children}) => {
    let lastId = 3;
    const [state, setState] = useState({
        current: null,
        mode: "welcome",
        welcome: "안녕하세요!!"

    });
    const [data, setData] = useState([
        {
            id: 0,
            name: "노을",
            title: "늦은 밤 너의 집 앞 골목길에서"
        },
        {
            id: 1,
            name: "악동뮤지션",
            title: "어떻게 이별까지 사랑하겠어, 널 사랑하는 거지"
        },
        {
            id: 2,
            name: "장범준",
            title: "흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야"
        }
    ]);

    const updateCurrent = number => setState({ ...state, current: number, mode: "read" });
    const updateMode = text => setState({ ...state, mode: text });

    const onCreate = content => {
        setData([
            ...data, {id: lastId++, ...content}
        ]);
        setState({
            ...state,
            mode: "read",
            current: Number(lastId - 1),
        });
    };

    const onUpdate = content => {
        setData(data.map(item => item.id === state.current ?
            {...item, ...content} :
            item
        ));
        setState({...state, mode: "read"});
    };

    const onDelete = id => {
        if( data.length <= 1 ) return alert("마지막 글은 지울 수 없습니다");
        setData( data.filter(item => item.id !== id));
        setState({...state, mode: "welcome"});
    };

    return(
        <AppContext.Provider value={{ state, data, fn :{updateCurrent, updateMode, onCreate, onUpdate, onDelete }}}>
            {children}
        </AppContext.Provider>
    )
};

// 위에 적용된 파일을 편하게 부르기 위해서 작성
// 없다면 state 부를때마다 const {state} = useContext(AppContext); 매번 작성해줘야한다.
export const useContent = () => {
    const { state } = useContext(AppContext);
    return state;
};

export const useData = () => {
    const { data } = useContext(AppContext);
    return data;
};

export const useFns = () => {
    const { fn } = useContext(AppContext);
    return fn;
};

export default AppContextProvider;

