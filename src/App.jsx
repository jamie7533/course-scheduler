import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner.jsx";
import CourseList from "./components/CourseList.jsx";
import CourseEditor from './components/CourseEditor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import { addScheduleTimes } from './utilities/time';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  let schedule = [];

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;
  schedule = addScheduleTimes(data);
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
