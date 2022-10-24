import CurrentWeather from './components/current-weather/current-weather'; 
import Forecast from './components/forecast/forecast';
import Search from './components/search/search';
import { Weather_Api_URL , Weather_Api_Key , Forecast_Api_URL } from './api/api'
import './App.css';
import { useState } from 'react';


const App = ()=> {

  const[currentWeather,setCurrentWeather] = useState(null);
  const[forecast,setForecast] = useState(null)

  const handleOnSearchChange = (searchData) =>{

    const [lat,lon]= searchData.value.split(" ")
    

    //fetch data from apis
    const currentWeatherFetch = fetch(`${Weather_Api_URL}weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}&units=metric`);
    const forecastFetch = fetch(`${Forecast_Api_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}&units=metric`);

    Promise.all([currentWeatherFetch,forecastFetch])
    .then(
      async (response) => {
         const weatherResponse =  await response[0].json();
         const forecastResponse = await response[1].json();

         setCurrentWeather({city : searchData.label , ...weatherResponse});
         setForecast({city : searchData.label , ...forecastResponse});
      })
      .catch(
        error=>console.log(error.message)
      )
    }


  return (
    <div className="container" >
      <p className='title'>Weather</p>
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast       && <Forecast  data={forecast} />}
    </div>
  );
}

export default App;
