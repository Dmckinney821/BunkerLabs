import React from 'react';

class SearchBar extends React.Component{
    render() {
        return (
            <div>
                <input value={this.props.text} className="search-bar"
                onChange={(e) => 
                {this.props.handleChange(e.target.value)}} 
                type="text"
                placeholder="Search Company Name"/>
            </div>
        );
    }
}

export default SearchBar;