import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';
import { useNavigate, useParams } from 'react-router-dom'

const validateUserData = (key, val) => {
    switch (key) {
        case 'title':
            return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
        case 'meets':
            return /[M|Tu|W|Th|F]+ [0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/gm.test(val) ? '' : 'Invalid meeting times - must specify valid days (MTuWThF) followed by a space and valid military-style times';
        default: return '';
    }
};

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name}
            defaultValue={state.values?.[name]} onChange={change} />
        <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
);

const ButtonBar = ({ message, disabled }) => {
    const navigate = useNavigate();
    return (
        <div className="d-flex">
            <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary me-auto" disabled={disabled} onClick={() => navigate(-1)}>Submit</button>
            <span className="p-2">{message}</span>
        </div>
    );
};

const CourseEditor = ({course}) => {
    const id = Object.values(useParams())
    const [update, result] = useDbUpdate(`/courses/${id}`);
    const [state, change] = useFormData(validateUserData, course);
    const submit = (evt) => {
        evt.preventDefault();
        if (!state.errors) {
            update(state.values);
        }
    };

    return (
        <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
            <InputField name="title" text="Course Title" state={state} change={change} />
            <InputField name="meets" text="Meeting Time" state={state} change={change} />
            <ButtonBar message={result?.message} disabled={Object.values(state.values).length < 2 || state.errors}/>
        </form>
    )
};

export default CourseEditor;