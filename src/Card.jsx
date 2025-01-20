import React, { useEffect, useRef, useState } from 'react'
import './card.css'
import wind from './assets/wind.png';
import cloud from './assets/cloud.png';
import snow from './assets/snow.png';
import drizzle from './assets/drizzle.png';
import rain from './assets/rain.png';
import clear from './assets/clear.png';
import humidity from './assets/humidity.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card() {
    const inputRef = useRef()
    const [wdata , setWdata] = useState(false)
    const allIcons={
        "01d":clear
        ,
        "01n":clear
        ,
        "02d":cloud

        ,"02n":cloud
        ,"03d":cloud
        ,"03n":cloud

        ,"04d":drizzle
        ,"04n":drizzle

        ,"09d":rain
        ,"09n":rain
        ,"10d":rain
        ,"10n":rain

        ,"13d":snow
        ,"13n":snow

    }
    const search = async(city)=>{

        try{

            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            const icon = allIcons[data.weather[0].icon]||clear
            setWdata({
                humidity:data.main.humidity
                ,windSpeed:data.wind.speed
                ,temprature:Math.floor(data.main.temp)
                ,location:data.name 
                ,icon:icon
            })

        }catch(err){
          console.log("error " , err)
        }
            
    } 

    // const c = document.getElementsByClassName("form-control me-2").value

    useEffect(()=>{
        search("London")
    },[])

    return (
        <>
            <div className="card" >
                <div className="card-body" style={{backgroundColor:"#402eb8"}}>
                    <form className="d-flex" role="search">
                        <input ref={inputRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  style={{borderRadius:"20px",marginBottom:"20px"}}/>
                        <button className="btn" type="submit" onClick={(e)=>{
                            e.preventDefault() // stop reload
                            search(inputRef.current.value)}}>Search </button>
                    </form>
                    <img id='weather-icon' src={wdata.icon} className="card-img-top"  style={{borderRadius:"20px" , marginTop:"20px"}}></img>
                    <p id='degree' className="card-text" style={{fontSize:"30px" , textAlign:"center" ,color:"white"}} >{wdata.temprature}</p>
                    <p id='location' className="card-text" style={{fontSize:"30px" , textAlign:"center" ,color:"white"}} >{wdata.location}</p>
                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity} alt="" />
                            <div>
                                <p>{wdata.humidity} %</p>
                                <span>Humedity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind} alt="" />
                            <div>
                                <p>{wdata.windSpeed} km/h</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                        
                    </div>

                </div> 
            </div>
        </>
    )
}
