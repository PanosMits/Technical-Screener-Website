import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import SearchForm from '../Components/SearchForm';
import ResultsTable from '../Components/ResultsTable';
import Loader from '../Components/Loader';

const Home = () => {
    const { pattern } = useParams();
    const { error, isLoading, data: patternResults } = useFetch(`/api/get-technical-analysis/${pattern}/`);

    console.log(patternResults);
    return (
        <div>
            <div className="jumbotron">
                <SearchForm />
            </div>
            {patternResults && <ResultsTable data={patternResults} />}
            { error && patternResults && <div>{error}</div>}
            { isLoading && <Loader />}
        </div >
    )
}

export default Home;