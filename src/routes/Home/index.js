import '../../App.css';
import { useNavigate  } from "react-router-dom";
import { useState } from 'react';


const Home = () => {
    let navigate  = useNavigate ();
    const [niverYear, setNiverYear] = useState('1990')
    const [niverMonth, setNiverMonth] = useState('01')
    const [niverDay, setNiverDay] = useState('01')


    

    const exibeResult = () => {

        navigate(`/resultado?niver=${niverYear}-${niverMonth}-${niverDay}`)    
    }

    return(
        <div className="App">
            <p>
            vamos brincar de fetch api <br/>
            </p>

            Digite seu aniversário:

            <input type="text" value={niverDay} onChange={(e) => setNiverDay(e.target.value)} />
            <input type="text" value={niverMonth} onChange={(e) => setNiverMonth(e.target.value)} />
            <input type="text" value={niverYear} onChange={(e) => setNiverYear(e.target.value)} />



            <button onClick={exibeResult}>
                dfgh
            </button>


        </div>
    )
}

export default Home;