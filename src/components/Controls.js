import React from 'react';
import {useContent, useData, useFns} from "../context";
import styled from "styled-components";

const Box = styled.div`
    margin-top:30px;
    button{ margin-right:5px; }
`;

const Controls = () => {
    const {updateMode, onDelete} = useFns();
    const {current, mode} = useContent();

    const handleDelete = ()  => {
        onDelete(current);
        updateMode("welcome");
    };

    return (
        <>
            <Box>
                {(mode === "read" || mode === "welcome") &&
                    <button onClick={() => updateMode("create")}>추가</button>
                }
                {mode === "read" &&
                    <>
                        <button onClick={() => updateMode("update")}>수정</button>
                        <button onClick={handleDelete}>삭제</button>
                    </>
                }
            </Box>
        </>
    );
};

export default Controls;
