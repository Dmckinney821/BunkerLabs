import React from 'react';
// import Dropdown from './Dropdown';
import './Filter.css';

class FilterBy extends React.Component{

    _convertToDropDown = (option) => {
        return (
            <option value={option} key={option}>{option}</option>
        )
    };
    
    render(){
            return(
                <div className="filter-button">
                    <select className="select-filterby" name={this.props.type} defaultValue={this.props.value} onChange={(e) => 
                    {this.props.handleChange(e.target.value)}} >
                        {this.props.listItems.map(item => this._convertToDropDown(item))}
                    </select>
                </div>
            )
        }
}


export default FilterBy;