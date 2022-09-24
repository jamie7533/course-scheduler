// "F101" : {
//     "term": "Fall",
//     "number": "101",
//     "meets" : "MWF 11:00-11:50",
//     "title" : "Computer Science: Concepts, Philosophy, and Connections"
//   },

const Course = ({course}) => (
    <table>
      <tbody>
        <tr><th>{course.term} CS {course.number}</th></tr>
        <tr><td>{course.title}</td></tr>
        <tr><td>{course.meets}</td></tr>
      </tbody>
    </table>
  );

const CourseList = ({courses}) => {
    return (
        <div>
            {Object.entries(courses).map(([id, course]) => <Course key={id} course={course}/>)}
        </div>
    );
};

export default CourseList;