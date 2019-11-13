import React, {useState, useContext, useCallback, useMemo} from 'react';

const AppContext = React.createContext();

let last = 3;
const AppContextProvider = ({children}) => {
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

    const updateCurrent = useCallback(number => {
        setState({ ...state, current: number, mode: "read" })
    }, []);

    const updateMode = useCallback(text => {
        setState({ ...state, mode: text })
    }, [state]);

    const onCreate = useCallback(content => {
        setData([
            ...data, {id: last , ...content}
        ]);
        setState({
            ...state, mode: "read", current: last
        });
        last = last + 1;
    }, [data]);

    const onUpdate = useCallback(content => {
        setData(data.map(item => item.id === state.current ?
            {...item, ...content} :
            item
        ));
        setState({...state, mode: "read"});
    }, [state.current]);

    const onDelete = useCallback(id => {
        setData(data.filter(item => item.id !== id));
        setState({...state, mode: "welcome"});
    }, [data]);

    // context 최적화를 위해 useMemo 를 사용해준다. (캐싱필요)
    // 리랜더링 될 때마다 provider 내부애들을 재생성하기때문
    // https://www.youtube.com/watch?v=tRSsb7wz994&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=57 3:33 부터
    const value = useMemo(() =>({
        state, data, fn :{updateCurrent, updateMode, onCreate, onUpdate, onDelete }
    }), [state, data]);

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

// 위에 적용된 파일을 편하게 부르기 위해서 작성
// 없다면 state 부를때마다 const {state} = useContext(AppContext); 매번 작성해줘야한다.
export const useContent = () => {
    const { state, data } = useContext(AppContext);
    return { state, data };
};

export const useFns = () => {
    const { fn } = useContext(AppContext);
    return fn;
};

export default AppContextProvider;

