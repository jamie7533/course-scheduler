const Cart = ({ selected }) => (
    <div>
        {
            selected.length === 0
                ? <h2>No courses selected. Click any course card to select it.</h2>
                : Object.entries(selected).map(([id, course]) => (
                    <div key={id}>
                        <h6>{course.title}</h6>
                        <p>-- {course.term} CS {course.number} <br/>meets {course.meets}</p>
                        <hr/>
                    </div>
                ))
        }
    </div>
);

export default Cart;