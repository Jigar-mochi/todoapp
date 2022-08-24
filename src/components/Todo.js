import React from 'react'
import { useState, useEffect } from 'react'
import '../css/todo.css'
import { AiFillDelete } from "react-icons/ai";
// import Conta from '../context/context';
// import { useContext } from 'react';
// import axios from 'react'

const Todo = () => {
    // const data1 = useContext(Conta)
    // console.log(data1)
    const getNote = async () => {
        const url = 'https://todo-4719b-default-rtdb.firebaseio.com/addNote.json'
        const notes = await fetch(url)
        const parsData = notes.json()
        console.log(parsData)
    }
    useEffect(() => {
        getNote()
    }, [])

    const [text, setText] = useState('')
    const [note, setNote] = useState([])
    const add = () => {
        setNote(note.concat(text))
    }

    const handleclick = (e) => {
        e.preventDefault();
        if (!text) {

        } else
            add()

        setText('')
    }
    const change = (e) => {
        setText(e.target.value)
    }

    const delt = (del) => {
        setNote(note.filter((item, index) => index !== del))

    }
    const clear = () => {
        setNote([])
    }


    function check(event, index, stringValue) {
        if (event.target.checked === true) {
            document.getElementsByName(stringValue)[0].style.textDecorationLine = 'line-through'
        }
        else {
            document.getElementsByName(stringValue)[0].style.textDecoration = 'none'
        }

    }

    return (
        <div>
            <div className="container todo1 p-3 my-5 col-md-3">
                <form className="d-flex" onSubmit={handleclick}>
                    <input className="form-control me-2"
                        onChange={change} type="text" value={text} placeholder="enter some text here" aria-label="text" />
                    <button className="btn btn-outline-dark" type="submit">addnote</button>
                </form>
                {note.length !== 0 ?
                    note.map((e, index) => {
                        return <div key={index} className="container notes my-3 p-2 list" >
                            <input type="checkbox" onChange={b => check(b, index, e)} value={e} id='check' className='del' />
                            <h5 id='letter' name={e}>{e}</h5>
                            <AiFillDelete className='del' type='submit' onClick={() => delt(index)} />
                        </div>
                    }) : <div className='container notes my-3 p-3 list'>add some notes here</div>
                }
                <button className="btn btn-outline-dark" type="submit" onClick={clear}>clear all notes</button>
            </div>
        </div>
    )
}

export default Todo