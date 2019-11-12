import React from 'react';
import {useContent, useData, useFns} from "../context";
import styled from "styled-components";

const Button = styled.button`
    margin-bottom:3px;
    ${props => {if(props.active){return `color:red`}}}
`;

const List = () => {
    const data = useData();
    const {current, welcome, mode} = useContent();
    const {updateCurrent} = useFns();

    const content = data.filter(item => item.id === current)[0];

    return (
        <div>
            {/*{console.log(data)}*/}
            <ul>
                {data.map(item =>
                    <li key={item.id}><Button active={item.id === current} onClick={() => updateCurrent(item.id)}>{item.name}</Button></li>
                )}
            </ul>
            <div>
                {mode === "welcome" && <div>{welcome}</div>}
                {mode === "read" &&
                    <>
                        <div>{content.name}</div>
                        <div>{content.title}</div>
                    </>
                }
            </div>
        </div>
    );
};

export default List;
