import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApiOptions, GEO_API_URL } from '../../api/api';


const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null)

    const handleOnChange = (searchData) => {

        setSearch(searchData);
        onSearchChange(searchData);

    }

    const loadOptions = async (inputValue) => {

        const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
        const json = await response.json()

        return {
            options: json.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`
                }
                })
        }
    }
    //.catch(error => console.error(error.message));

    return <>

        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    </>
}

export default Search;