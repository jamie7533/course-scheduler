import { hasConflict } from "../utilities/time";

const Course = ({ course, selected, toggleSelected }) => {
    const isSelected = selected.includes(course);
    const isDisabled = !isSelected && hasConflict(course, selected);

    const style = {
      backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lemonchiffon' : 'white',
      color: isDisabled ? 'grey' : isSelected ? 'green' : 'black'
    };
    return (
      <div className="card m-1 p-2" onClick={isDisabled? null : () => { toggleSelected(course) }} style={style}>
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

  export default Course;