import { useEffect, useState } from 'react';
import { getCounterValue, updateCounterValue } from '../../api/CounterService';
import AssetTable from '../AssetTable/AssetTable';

function Counter() {

    // Creates, essentially, a global variable for the Counter component with "null" as the starting value
    const [count, setCount] = useState(null);

    // Tells the component to re-render when the Count variable changes
    useEffect(() => { }, [count])


    async function getCounterValueFromApi() {
        // Sets the count variable to the value from the API
        var value = await getCounterValue();
        setCount(value);
    }

    async function incrementCounter(val) {
        // Tells the API to increment the counter value by the specified 'val' variable
        var value = await updateCounterValue(val);
        setCount(value);
    }

    // This function is purely for displaying the count value pulled from the API
    function getCount() {
        // if it is null, the API hasnt loaded it yet
        // Therefore, we want to call the function to load it and then
        // Set the value to "loading" so users know it is doing something
        // Otherwise, we can just return the count
        if (count == null) {
            getCounterValueFromApi()
            return "Loading";
        } else {
            return count;
        }
    }

    return (
        <div>
            <button onClick={() => incrementCounter(1)}>Increment 1</button>
            <button onClick={() => incrementCounter(2)}>Increment 2</button>
            <button onClick={() => incrementCounter(3)}>Increment 3</button>
            <button onClick={() => incrementCounter(4)}>Increment 4</button>
            <p>{getCount()}</p>

            <div>
                <AssetTable></AssetTable>
            </div>
        </div>
    );
}

export default Counter;