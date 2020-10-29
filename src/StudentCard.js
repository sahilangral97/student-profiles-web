import React, { Component } from 'react';
import './index.css';

class StudentCard extends Component {

  state = {
    expanded: false,
    tag: ""
  }
  
  getAvg =() => {
    const avg = this.props.student.grades.reduce((a, b) => +a + +b, 0) /
    this.props.student.grades.length;
    return avg;

  };

  getExpandedData = () => {
    if (!this.state.expanded) return "";

    return (
      <>
        {this.props.student.grades.map((gd, i) => (
          <span key={i}>
            Test {i + 1}: {gd}
          </span>
        ))}
        {Array.isArray(this.props.student.tags) ? (
          <span>Tags:&nbsp;{this.props.student.tags.join(", ")}</span>
        ) : (
          ""
        )}
        <input 
          type = "text"
          placeholder="new tag" 
          value = {this.state.tag}
          onChange={(e) => this.setState({tag: e.target.value})}
        />
        <button onClick={(e) =>{ 
          this.props.addTag(this.state.tag,this.props.student.id);
          this.setState({tag: ""});
        }}>Add tag</button>
      </>
    );
  };
  

  render() {
    return (
    	<div className="student-card">
      <div className="card-img">
        <img src={this.props.student.pic} alt="profile-pic"/>
      </div>
      <div className="card-data">
        <h3>{this.props.student.firstName + " " + this.props.student.lastName}</h3>
        <span>Email: {this.props.student.email}</span>
        <span>Company: {this.props.student.company}</span>
        <span>Skill: {this.props.student.skill}</span>
        <span>Average: {this.getAvg()}%</span>
          {this.getExpandedData()}
      </div>
      <div className="card-action">
        <button onClick={(e) => this.setState({expanded: !this.state.expanded})}>
          {this.state.expanded ? "-" : "+"}
        </button>
      </div>
    </div>
      
    )
  }
}

export default StudentCard;
