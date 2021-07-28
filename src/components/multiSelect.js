import React from 'react'
import { Dropdown } from 'semantic-ui-react'


const MultipleSelect = ({options,selected,setSelect}) => {


    const onChange = (event, data) => {
        console.log(selected);
        setSelect(data.value);
    }

    return (
        <Dropdown 
        // placeholder='Employees' 
        fluid 
        multiple 
        selection 
        options={options}
        onChange={onChange}
        value={selected}
         />
    )
}

export default MultipleSelect