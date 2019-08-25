import React from 'react';
import RecruitingFocus from './RecruitingFocus';
import RecruitingList from './RecruitingList';
import RecruitingSearch from './RecruitingSearch';
const axios = require('axios');

class Recruiting extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: '',
      searchProps: [], 
      matchingResumes: [],
      currentResume: {}
    },

    this.handleChange = this.handleChange.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemoveSkill = this.handleRemoveSkill.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  handleChange (e) {
    // update text state
    this.setState({text: e.target.value});
  }

  handleAddSkill (e) {
    e.preventDefault();
    if(this.state.text.length === 0){
      return;
    }
    // push text to search props
    let newProperty = this.state.text;
    let newSearchProps = this.state.searchProps;
    newSearchProps.push(newProperty);
    this.setState({searchProps: newSearchProps});

    document.getElementById("formtext").value = "";
    this.setState({text: ''});
  }

  handleRemoveSkill (e) {
    let skillId = e.target.id;
    let skillIndex = this.state.searchProps.indexOf(skillId);
    let newSearchProps = this.state.searchProps;
    newSearchProps.splice(skillIndex, 1);
    
    this.setState({ searchProps: newSearchProps });
  }

  handleSearch () {
    // filter resumes using skills in searchProps
    // Add filtered resumes to matching resumes array
    // Display resumes on page
    let skills = '';
    for(let i = 0; i < this.state.searchProps.length; i++){
      if(i === this.state.searchProps.length - 1){
        skills += this.state.searchProps[i];
      } else {
        skills += this.state.searchProps[i] + '&';
      }
    }
    console.log(skills);
    axios.get(`/api/resume/${skills}`)
    .then( (response) => {
      // handle success
      console.log('success', response.data[0].basics.name);
      // let name = response.data[0].basics.name;
      let newMatchingResumes = response.data;
      this.setState({matchingResumes: newMatchingResumes})
    })
    .catch( (error) => {
      // handle error
      console.log('error in handleSearch function:', error);
    })
  }

  handleView (resume) {
    this.setState({currentResume: resume});
  }

  render () {
    return (
    <div className='Recruiter'>
      <h1 id="navbar">Recruiter Dashboard</h1>
      <RecruitingSearch handleAddSkill={this.handleAddSkill}
                        value={this.state.value}
                        handleChange={this.handleChange}
                        handleRemoveSkill={this.handleRemoveSkill}
                        searchProps={this.state.searchProps}
                        handleSearch={this.handleSearch}/>
      <div className='recruiter-main-container'>
        <RecruitingList className='recruiter-sidebar' resumes={this.state.matchingResumes} handleView={this.handleView}/>
        <RecruitingFocus className='recruiter-focus' focusResume={this.state.currentResume}/>
      </div>
    </div>
    );
  }
}

export default Recruiting;
