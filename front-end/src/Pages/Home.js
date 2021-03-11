import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import SearchForm from '../Components/SearchForm';
import Loader from '../Components/Loader';

const Home = () => {
    const { pattern } = useParams();
    // const { error, isLoading, data: patternResults } = useFetch(`/api/get-technical-analysis/${pattern}/`);
    const { error, isLoading, data: patternResults } = useFetch(`/api/test/${pattern}/`);

    console.log(patternResults);
    return (
        <div>
            <div className="jumbotron">
                <SearchForm />
            </div>
            { error && <div>{error}</div>}
            { isLoading && <Loader />}
        </div >
    )
}

export default Home;