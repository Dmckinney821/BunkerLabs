import React from 'react';
import Dropdown from './Dropdown';
import './Filter.css';

class Filter extends React.Component{
        render(){
            return(
                <div className="filtering-buttons">
                <Dropdown direction ="right" dropDownItems={['industry1', 'industry2']} text="Select the industry" key={1}/>
                <Dropdown direction="right" dropDownItems={['stage1','stage2']} text= "Select the stage" key={2}/>
                </div>
            )
        }
        
}

export default Filter;