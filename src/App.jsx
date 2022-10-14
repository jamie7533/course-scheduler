import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner.jsx";
import CourseList from "./components/CourseList.jsx";
import CourseEditor from './components/CourseEditor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { addScheduleTimes } from './utilities/time';
import { useDbData } from './utilities/firebase';

const Main = () => {
  // const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  // let schedule = [];
  const [data, error] = useDbData('/', addScheduleTimes); 
  
  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (!data) return <h1>Loading course data...</h1>;
  const schedule = addScheduleTimes(data);
  return (
    <>
      <Banner title={schedule.title} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CourseList courses={schedule.courses} />} />
          <Route path="/course_edit/:id" element={<CourseEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <Main />
      </div>
    </QueryClientProvider>
  );
};

export default App;
