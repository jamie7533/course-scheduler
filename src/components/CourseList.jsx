import { useState } from "react";
import Modal from "./Modal";
import Cart from "./Cart";
import Course from "./Course";

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

const CourseList = ({ courses }) => {
  const [selection, setSelection] = useState(() => Object.values(terms)[0])
  const termCourses = Object.entries(courses).filter(course => selection === course[1].term);
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
        {termCourses.map((course) =>
          <Course key={course[0]} id={course[0]} course={course[1]} selected={selected} toggleSelected={toggleSelected} />)}
      </div>
    </>
  );
};

export default CourseList;