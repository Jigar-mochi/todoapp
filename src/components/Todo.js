import React from 'react'
import '../css/todo.css'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { TbLetterCaseUpper, TbLetterCaseLower, TbLetterCaseToggle } from "react-icons/tb";


const getData = () => {
    let data = localStorage.getItem('lists')
    if (data) {
        return JSON.parse(localStorage.getItem('lists'))
    }
    else {
        return []
    }
}

const Todo = () => {

    const [text, setText] = useState('')
    const [arr, setArr] = useState(getData())
    const [editi, setEditi] = useState(true)
    const [id, setId] = useState('')

    const click = (e) => {
        e.preventDefault()
        if (!text) {
            alert('please fill some data')
        } else if (text && !editi) {
            setArr(
                arr.map((elem, index) => {
                    if (index === id) {
                        return text
                    }
                    return elem
                }))
            setText('')
            setId(null)
            setEditi(true)


        }
        else {
            setArr([...arr, text])
            setText('')
        }
    }
    const del = (index) => {
        setArr(arr.filter((e, inde) => inde !== index))
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(arr))
    }, [arr])

    const edit = (index) => {
        let item = JSON.parse(localStorage.getItem('lists'))[index]
        setText(item)
        setEditi(false)
        setId(index)
    }

    const change = (eve, index, string) => {
        if (eve.target.checked === true) {
            document.getElementsByName(string)[0].style.textDecorationLine = 'line-through'
        }
        else {
            document.getElementsByName(string)[0].style.textDecoration = 'none'
        }
    }
    const upper = (index) => {
        setArr(
            arr.map((elem, id) => {
                if (index === id) {
                    return elem.toUpperCase()
                    // return elem.toUpperCase()
                }
                return elem
            })
        )
    }
    const lower = (index) => {

        setArr(
            arr.map((elem, id) => {
                if (index === id) {
                    return elem.toLowerCase()
                }
                return elem
            })
        )
    }
    const sentCase = (index) => {
        setArr(
            arr.map((elem, id) => {
                if (index === id) {
                    return elem.split(" ").map((e) => e[0].toUpperCase() + e.slice(1)).join(' ')
                }
                return elem
            })
        )
    }

    return (
        <div className='conta'>
            <div className="container conta2 h-50 col-md-5">
                <h1 className='text-center text2 p-2'>todo app</h1>
                <form className='container conta3' onSubmit={click}>
                    <input className="form-control me-2 input1" onChange={(e) => setText(e.target.value)} value={text} type="search" placeholder="Search" aria-label="Search" />
                    {editi ?
                        <AiOutlinePlusCircle type='button' className='text1' /> :
                        // <AiOutlinePlusCircle type='button' className='text1' onClick={click} /> :
                        <MdModeEdit className='text1' />
                        // <MdModeEdit className='text1' onClick={click} />
                    }
                </form>
                <div className="container conta5 h-50 mt-3">
                    {
                        arr.map((e, index) => {
                            return <div key={index} className="container conta4 mt-2">
                                <div className="icon">
                                    <input className="form-check-input mt-0 input2" type="checkbox" onChange={b => change(b, index, e)} value='' id="flexCheckDefault" />
                                    <TbLetterCaseUpper className='ms-2 but' onClick={() => upper(index)} />
                                    <TbLetterCaseLower className='ms-2 but' onClick={() => lower(index)} />
                                    <TbLetterCaseToggle className='ms-2 but' onClick={() => sentCase(index)} />
                                </div>

                                <h5 className='ps-2' name={e}>{e}</h5>
                                <div className='icon'>
                                    <MdModeEdit onClick={() => edit(index)} />
                                    <MdDelete onClick={() => del(index)} />
                                </div>

                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo