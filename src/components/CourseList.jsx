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
  return (
    <div className="course-list">
      {Object.entries(courses).map(([id, course]) => <Course key={id} course={course} />)}
    </div>
  );
};

export default CourseList;