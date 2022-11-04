import { hasConflict } from "../utilities/time";
import { Link } from 'react-router-dom';
import { useAuthState } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";

const Course = ({ id, course, selected, toggleSelected }) => {
  const user = useAuthState();
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled ? 'lightgrey' : isSelected ? 'lemonchiffon' : 'white',
    color: isDisabled ? 'grey' : isSelected ? 'green' : 'black'
  };

  const [profile, profileLoading, profileError] = useProfile();
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <div className="card m-1 p-2" data-cy="course" onClick={isDisabled ? null : () => { toggleSelected(course) }} style={style}>
      {profile?.isAdmin &&
        <div>
          <Link to={`/course_edit/${id}`} params={{ id, course }}>
            <button> <i className="bi bi-pencil"></i></button>
          </Link>
        </div>}
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