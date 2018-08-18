import React from 'react';
import './Homepage.css';
import SearchBar from './SearchBar';
import CompanyList from './CompanyList';
import FilterBy from './FilterBy';

class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            companies:[],
            searchText: '',
            industryFilter: 'Industry',
            stageFilter: 'Stage',
            industryList: [],
            stageList: []
        }
    }

    componentDidMount(){
        const url = `http://localhost:4000/api/companies/`;
        let industries = ['Industry'];
        let stages = ['Stage'];
        fetch(url)
            .then(companies=>companies.json())
            .then(companies=>{
                this.setState({
                    companies
                }, () => {
                    this.state.companies.forEach(company => {
                        if (stages.includes(company.stage) === false) {
                            stages.push(company.stage);
                        }
                    });
                    this.state.companies.forEach(company => {
                        if (industries.includes(company.industry) === false) {
                            industries.push(company.industry);
                        }
                    });
                    })
                    }
                )
            .then((() => {
                this.setState({
                    industryList: industries,
                    stageList: stages,
                })
            }));
    }

    _updateSearchText = (newSearchText) => {
        this.setState({
            searchText: newSearchText
        });
    }

    _updateIndustryFilter = (newIndustryFilter) => {
        this.setState({
            industryFilter: newIndustryFilter
        })
    }
    
    _updateStageFilter = (newStageFilter) => {
        this.setState({
            stageFilter: newStageFilter
        })
    }

    _retrieveCompaniesByFilterAndSearch = () => {
        // Is there a filter ? 
        // If so, filter
        // If not, return all
        let doesSearchMatchName
        let doesIndustryMatch;
        let doesStageMatch;
        if (this.state.industryFilter !== 'Industry' || this.state.stageFilter !== 'Stage' || this.state.searchText !== '') {
            let filteredCompanies = this.state.companies.filter(company => {
                if (this.state.industryFilter === 'Industry') {
                    doesIndustryMatch = true
                } else {
                    doesIndustryMatch = company.industry.toLowerCase().includes(this.state.industryFilter.toLowerCase());
                }
                if (this.state.stageFilter === 'Stage') {
                    doesStageMatch = true
                } else {
                    doesStageMatch = company.stage.toLowerCase().includes(this.state.stageFilter.toLowerCase());
                }
                if (this.state.searchText === '') {
                    doesSearchMatchName = true
                } else {
                    doesSearchMatchName = company.name.toLowerCase().includes(this.state.searchText.toLowerCase());
                }
                return doesIndustryMatch && doesStageMatch && doesSearchMatchName
            });
            return filteredCompanies
        } else {
            return this.state.companies
        }
    }

    render(){

        
        return(
            <div>
                <div className="homepage-container">

                <div className="homepage-info-container">
                    <div className="homepage-info">
                    <h3> 
                        SUPPORTING VETERAN OWNED BUSINESSES
                    </h3>
                    <p> This page is dedicated to highlighting Veteran owned business. Search businesses by stage and industry and learn more about their current needs. 
                    Meet each owner, learn more and support our veterans!
                    </p>

                    </div>
                </div>

                <div>
                <SearchBar text={this.state.searchText} 
                handleChange={this._updateSearchText} />
                </div>
                
                <div className='filter-container'>
                    <FilterBy type='industry' listItems={this.state.industryList} value={this.state.industryFilter} handleChange={this._updateIndustryFilter}/>
                    <FilterBy type='stage' listItems={this.state.stageList} value={this.state.stageFilter} handleChange={this._updateStageFilter}/>
                </div>

                <CompanyList filteredCompanies={this._retrieveCompaniesByFilterAndSearch()} />

                </div>
            </div>
        )
    }
}
    
export default Homepage;