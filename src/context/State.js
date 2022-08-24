import Conta from "./context";
import axios from 'react'
const State = (props) => {
    // const [data, setData] = useState([])
    const getNote = async () => {
        const url = 'https://todo-4719b-default-rtdb.firebaseio.com/addNote.json'
        const notes = await axios.get(url)
            .then((resp) => console.log(resp))
            .catch((err) => err)
    }
    return (
        <Conta.Provider value={{ data, getNote }}>
            {props.children}
        </Conta.Provider>)
}
export default State