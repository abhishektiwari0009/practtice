import React from 'react'
import C from "./C.jsx";

const B = ({data1}) => {
    return (
        <>
            <h1>B component</h1>
            <C data2 = {data1}></C>
        </>
    )
}
export default B
