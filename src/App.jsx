import './App.css';
import Banner from "./components/Banner.jsx";
import CourseList from "./components/CourseList.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  return (
    <>
    <Banner title={data.title}/>
    <CourseList courses={data.courses}/>
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
