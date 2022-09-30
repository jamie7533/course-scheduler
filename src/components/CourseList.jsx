import { useState } from "react";

const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };
const TermSelector = ({ selection, setSelection }) => (
  <div className="btn-group">
    {
      Object.values(terms)
        .map(value => <TermButton key={value} term={value} selection={selection} setSelection={setSelection} />)
    }
  </div>
);
const TermButton = ({ term, selection, setSelection }) => (
  <>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <h5 className="card-title">{course.term} CS {course.number}</h5>
      <div className="card-text">{course.title}</div>
    </div>
    <div className="card-footer">
      {course.meets}
    </div>
  </div>
);

const CourseList = ({ courses }) => {
  const [selection, setSelection] = useState(() => Object.values(terms)[0])
  const termCourses = Object.values(courses).filter(course => selection === course.term);
  return (
    <>
      <TermSelector selection={selection} setSelection={setSelection} />
      <div className="course-list">
        {Object.entries(termCourses).map(([id, course]) => <Course key={id} course={course} />)}
      </div>
    </>
  );
};

export default CourseList;