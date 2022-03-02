import '../../App.css';
import { useNavigate  } from "react-router-dom";


const Home = () => {
    let navigate  = useNavigate ();

    const exibeResult = () => {

        navigate('/resultado')    
    }

    return(
        <div className="App">
            <p>
            vamos brincar de fetch api <br/>
            </p>

            Digite seu aniversário:

            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>



            <button onClick={exibeResult}>
                dfgh
            </button>


        </div>
    )
}

export default Home;