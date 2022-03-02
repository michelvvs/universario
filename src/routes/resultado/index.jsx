import axios from 'axios';

function Resultado () {

    const queryParams = new URLSearchParams(window.location.search)
    const niver = queryParams.get("niver")
    // const niverYear = 
        axios.request(
            {
                method: 'GET',
                url : `http://localhost:21333/billboard`, 
                headers: {'Content-Type': 'application/json'},

                data: {
                    "year": "1991",
                    "month": "03",
                    "day": "07"
                }
                
            }
        )
          .then(res => {
            const musics = res.data;
            console.log(musics);
          })
      

     console.log(niver)
    return(
        <>
        Oi fedelhos, esse é o resultado
        </>
    )
}

export default Resultado;