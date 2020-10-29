import React, { Component } from 'react';
import StudentList from './StudentList';
import './index.css';

class App extends Component {

  state = {
    nameSearchKeyword: "",
    tagSearchKeyword: "",
    students: []
  }

  async componentDidMount(){
    const url = "https://www.hatchways.io/api/assessment/students";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({students: data.students})
    //console.log(data.students[0]);
  }

  getStudents(){
    return this.state.students.filter((e) => {
      const name = (e.firstName+' '+e.lastName)
      .toLowerCase()
      .search(this.state.nameSearchKeyword.toLowerCase()) !== -1;
      
      const tag = 
      this.state.tagSearchKeyword.length === 0
          ? true
          : typeof e.tags === "undefined"
          ? false
          : e.tags.some(
              (tg) =>
                tg
                  .toLowerCase()
                  .search(this.state.tagSearchKeyword.toLowerCase()) !== -1
            );
            return name && tag
    });
  }

  addTag = (tag,id) => {
    this.setState((prevState) => ({
      ...prevState,
      students: prevState.students.map((st) => {
        if(st.id === id){
          if(Array.isArray(st.tags))
            return {...st, tags: Array(...new Set([...st.tags, tag]))};
          else return {...st, tags: [tag]}; 
        } else return st;
      })
    }));
  }

  render() {
    console.log(this.state.students)
    return (
      <div className="App">
        <input
          type = "text"
          placeholder = "Search by name"
          value = {this.state.nameSearchKeyword}
          onChange={(e) => this.setState({nameSearchKeyword: e.target.value})}
        />

        <input
          type = "text"
          placeholder = "Search by tags"
          value = {this.state.tagSearchKeyword}
          onChange={(e) => this.setState({tagSearchKeyword: e.target.value})}
        />
        
        <StudentList 
          students={this.getStudents()}
          addTag = {(id,tg) => this.addTag(id,tg)} 
        />
      </div>
    );
  }
}

export default App;
