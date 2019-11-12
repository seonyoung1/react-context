import React, {useState, useEffect, useCallback} from 'react';
import {useContent, useFns, useData} from "../context";
import styled from "styled-components";

const Wrap = styled.div`
    margin-top:30px;
    input{ width:300px; padding:3px 10px; margin-bottom:5px; }
    button{ margin-right:5px; }
`;

const Form = () => {
    const data = useData();
    const {mode, current} = useContent();
    const {updateMode, onCreate, onUpdate} = useFns();
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        if( mode === "update" ){
            setName( data.filter(item => item.id === current)[0].name );
            setTitle( data.filter(item => item.id === current)[0].title );
        }
    }, [mode]);

    const onChangeName = useCallback(e => {
        setName(e.target.value);
    }, [name]);

    const onChangeTitle = useCallback(e => {
        setTitle(e.target.value);
    }, [title]);

    const onSubmit = e => {
        e.preventDefault();
        console.log({name, title});
        if( mode === "create" ){
            onCreate({name, title});
        }else if( mode === "update" ){
            onUpdate({name, title})
        }
    };

    return (
        <>
            {(mode === "create" || mode === "update") &&
                <Wrap>
                    <form onSubmit={onSubmit}>
                        <div>
                            <input type="text" placeholder="이름" value={name} onChange={onChangeName} />
                        </div>
                        <div>
                            <input type="text" placeholder="제목" value={title} onChange={onChangeTitle} />
                        </div>
                        <div>
                            <button type="submit">{mode==="create"?"추가":"수정"}</button>
                            <button type="button" onClick={() => updateMode("read")}>취소</button>
                        </div>
                    </form>
                </Wrap>
            }
        </>
    );
};

export default Form;
