import React,{useState} from 'react';
import './Weather.css';

function Weather (){

    const [inpValue, setInpValue] = useState('');
    const [cityName, setCityName] = useState('');
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [view, setView] = useState(false);



    const getValue = (event) => {
        setInpValue(event.target.value)
        setCityName(event.target.value)
    };

    const getData = (event) => {
        event.preventDefault();
        fetch(`https://goweather.herokuapp.com/weather/:${inpValue}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setWeather(data)
            setForecast(data.forecast)
        })

        setInpValue('')
        setView(!view)
        if(!inpValue){
            alert("Please write some city name")
            setView(false)

        }
    }

    const options= (
        <div className='options'>
                <h1>{cityName}</h1>
                <span> <i className="fas fa-temperature-high"></i> {weather.temperature}</span>
                <span> <i className="fas fa-wind"></i> {weather.wind}</span>
                <span> <i className="fas fa-cloud-sun"></i>{weather.description}</span>
        </div>
    )
    
    return (
        <div className="container">
        <form onSubmit={getData}> 
              <input 
                type="text" 
                placeholder="Please write country name" 
                className = 'Input'
                value={inpValue}
                onChange={(event) => getValue(event)}/>
              <button type="button" className='Button' onClick={getData}>Search</button>
        </form>
        {view && options}
        
        
        <div className="forcast">
        {
            view && forecast.map((item) => {
                return(
                    <div  key={item.day}>
                    <h1>{item.day === '1' ? 'Tomorrow' : 
                    item.day === '2' ? 'Day After Tomorrow' :
                    item.day === '3' ? 'After 2 day' : null}</h1>
                <p><i className="fas fa-temperature-high"></i>  - {item.temperature}</p>
                <p><i className="fas fa-wind"></i> - {item.wind}</p>
            </div>
                )
            })
        }
       
        </div>
        </div>
        

    )
}
export default Weather;