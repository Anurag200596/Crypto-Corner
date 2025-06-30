import { createContext, useEffect, useState } from "react";


 export const CoinContext = createContext()

 const CoinProvider = ({children})=>{
    const [coinNo,setCoinNo] = useState(10)
    const [coins,setCoins] = useState([])
    const [currency,setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })
    const fetchData = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-spqA1id5dL6vakLiP83UyxL8'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setCoins(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchData()

    },[currency,coinNo])
    const contextValue = {
        coins,currency,setCurrency,coinNo,setCoinNo
    }
    return(
        <CoinContext.Provider value={contextValue}>
            {children}
        </CoinContext.Provider>
    )
 }

 export default CoinProvider

