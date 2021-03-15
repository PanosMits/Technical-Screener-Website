import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import patterns from '../Repositories/Patterns';

const SearchForm = ({ handlePriceLoadingErrorMessage }) => {
    const history = useHistory();
    const [pattern, setPattern] = useState(patterns[0].value);

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePriceLoadingErrorMessage();
        const candlestick = { pattern };
        history.push(`/${candlestick.pattern}`);
    }

    return (
        <div className="search-form">
            <h2>Search for indicators</h2>
            <form onSubmit={handleSubmit}>
                <label>Candlestick pattern</label>
                <select value={pattern.value} onChange={(e) => { setPattern(e.target.value) }}>
                    {patterns.map((datum) => (
                        <option value={datum.value} key={datum.id}>
                            {datum.name}
                        </option>
                    ))}
                </select>
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchForm;