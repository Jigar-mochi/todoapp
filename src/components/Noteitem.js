import React from 'react'
// import { useState } from 'react'
import '../css/todo.css'
import { MdDelete, MdModeEdit } from "react-icons/md";

const Noteitem = (props) => {
    let { arr, del, edit } = props;
    return (
        <div>
            {
                arr.map((e, index) => {
                    return <div key={index} className="container conta4 mt-2">
                        <h5 className='ps-2'>{e}</h5>
                        <div className='icon'>
                            <MdModeEdit onClick={() => edit(index)} />
                            <MdDelete onClick={() => del(index)} />
                        </div>

                    </div>
                })
            }
        </div>
    )
}

export default Noteitem