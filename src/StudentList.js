import React, { Component } from 'react';
import StudentCard from './StudentCard';
import './index.css';
class StudentList extends Component {

  render() {
    return this.props.students.map(( student) =>(
    <StudentCard 
      key = {student.id}
      student={student}
      addTag = {this.props.addTag} 
    />
	)
    );
  }
}

export default StudentList;