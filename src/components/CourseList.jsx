import { useState } from "react";
import Modal from './Modal';
import Cart from "./Cart";

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
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

const ScheduleButton = ({ openModal }) => (
  <button className="ms-auto btn btn-dark" onClick={openModal}>Course Plan</button>
);

const Course = ({ course, selected, toggleSelected }) => {
  const isSelected = selected.includes(course);
  const style = {
    backgroundColor: isSelected ? 'lemonchiffon' : 'white',
    color: isSelected ? 'green' : 'black'
  };
  return (
    <div className="card m-1 p-2" onClick={() => { toggleSelected(course) }} style={style}>
      <div className="card-body">
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <div className="card-text">{course.title}</div>
      </div>
      <div className="card-footer">
        {course.meets}
      </div>
    </div>
  );
};

const CourseList = ({ courses }) => {
  const [selection, setSelection] = useState(() => Object.values(terms)[0])
  const termCourses = Object.values(courses).filter(course => selection === course.term);
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (course) => setSelected(
    selected.includes(course)
      ? selected.filter(x => x !== course)
      : [...selected, course]
  );
  return (
    <>
      <nav className="d-flex">
        <TermSelector selection={selection} setSelection={setSelection} />
        <ScheduleButton openModal={openModal} />
      </nav>
      <Modal open={open} close={closeModal}>
        <Cart selected={selected} />
      </Modal>
      <div className="course-list">
        {Object.entries(termCourses).map(([id, course]) =>
          <Course key={id} course={course} selected={selected} toggleSelected={toggleSelected} />)}
      </div>
    </>
  );
};

export default CourseList;