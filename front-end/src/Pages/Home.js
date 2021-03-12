import { useParams } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import SearchForm from '../Components/SearchForm';
import ResultsTable from '../Components/ResultsTable';
import Loader from '../Components/Loader';

const Home = () => {
    const { pattern } = useParams();
    const { error, isLoading, data: patternResults } = useFetch(`/api/get-technical-analysis/${pattern}/`);

    return (
        <div>
            <div className="jumbotron">
                <SearchForm />
            </div>

            {isLoading && <Loader />}
            {isLoading && <Loader />}
            {isLoading && <Loader />}

            {patternResults && <ResultsTable stocks={patternResults.stocks} currentPattern={patternResults.current_pattern} />}

            { error && patternResults && <div>{error}</div>}
        </div >
    )
}

export default Home;