import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../Hooks/useFetch';
import SearchForm from '../Components/SearchForm';
import ResultsTable from '../Components/ResultsTable';
import Loader from '../Components/Loader';
import Button from '../Components/Button';

const Home = () => {
    const { pattern } = useParams();
    const { error: patternErrorMessage, isLoading: patternsLoading, data: patternResults } = useFetch(`/api/get-technical-analysis/${pattern}/`);
    const [pricesLoading, setPricesLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const loadSnPData = async () => {
        setPricesLoading(true);
        setMessage(null);
        await fetch('/api/snapshot/companies')
            .then(response => {
                if (!response.ok) {
                    setMessage('An error occurred, please try again later');
                    setPricesLoading(false);
                }
            });
    }

    const loadCryptoData = async () => {
        setPricesLoading(true);
        setMessage(null);
        await fetch('/api/snapshot/cryptos')
            .then(response => {
                if (!response.ok) {
                    setMessage('An error occurred, please try again later');
                    setPricesLoading(false);
                }
            });
    }

    const handleMessage = () => {
        setMessage(null);
    }

    return (
        <div>
            <div className="row">
                <div className="col-10">
                    <div className="jumbotron">
                        <SearchForm handleMessage={handleMessage} />
                    </div>
                    {patternsLoading && <Loader />}

                    {pricesLoading && <Loader />}
                    {pricesLoading && <div>{'Loading prices, this will take a while but you only need to run it once a day'}</div>}

                    {patternResults && <ResultsTable stocks={patternResults.stocks} currentPattern={patternResults.current_pattern} />}

                    {patternErrorMessage && patternResults && <div>{patternErrorMessage}</div>}

                    {message && <div>{message}</div>}
                </div>
                <div className="col-2">
                    <Button text={'Load S&P500 data'} onClick={loadSnPData} />
                    <Button text={'Load Cryptos data'} onClick={loadCryptoData} />
                </div>
            </div>
        </div >
    )
}

export default Home;