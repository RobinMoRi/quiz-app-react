import React from 'react'

const input = (props) => {
    return (
        <form>
            <select name="cars" id="cars" onChange={props.changed}>
                {props.values.map(object => (
                    <option key={object.value} value={object.value}>
                        {object.displayValue}
                    </option>
                ))}
            </select>
        </form>

    )
}

export default input