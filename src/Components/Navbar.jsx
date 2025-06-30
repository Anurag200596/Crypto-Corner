import react, { useContext } from "react"
import  logo from "../../src/assets/logo.png"
import arrow from "../../src/assets/arrow_icon.png"
import { CoinContext } from "../Context/CoinContext"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../firebase"

const Navbar = ()=>{
    const navigate = useNavigate()
    
    const {setCurrency} = useContext(CoinContext)
    const handleSignOut = ()=>{
        logout()
        navigate('/login')
       
    }
    const currencyHandler = (e)=>{
        switch(e.target.value){
            case "USD" : {
                setCurrency({
                    name : "usd",
                    symbol: "$"
                })
                break;
            }
            case "INR" :{
                setCurrency({
                    name:"inr",
                    symbol: "₹"
                })
                break;
            }
            default:{
                setCurrency({
                    name:"usd",
                    symbol: "$"
                })
                break
            }
        }


    }
    return(
        <>
        <div className="navbar flex items-center justify-between gap-10 py-4 border-b-[2px] border-b-[#3c3c3c] px-25 ">
            <Link to={"/"}>
            <img  className="w-45 cursor-pointer" src={logo} alt="" />
            </Link>
          <ul className="flex items-center gap-8">
            <Link to={"/"}  className="capitalize font-medium text-md">Home</Link>
            {
                ["features" , "pricing", "blog"].map((elem,idx) => <li className="capitalize font-medium text-md" key={idx}>{elem}</li>)

            }
          </ul>
            <div className="right flex gap-3  items-center">
            <select onChange={currencyHandler} name="Currency" id="Curr" className="border-2 border-white cursor-pointer py-1 rounded-lg px-3">
                <option className="text-black" value="USD">USD</option>
                <option className="text-black" value="INR">INR</option>
            </select>
            <button   onClick={handleSignOut} className="flex gap-4 items-center text-md font-d cursor-pointer  bg-white py-2 px-5  text-black rounded-full">Sign Out
                <img className="h-3" src={arrow} alt="" />
            </button>
            </div>

        

        </div>
        
        </>
    )
}

export default Navbar