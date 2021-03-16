const ResultsTable = ({ title, currentPattern, results }) => {
    const filteredResults = Object.values(results).filter((stock) => {
        return stock[currentPattern];
    });

    console.log(filteredResults);

    if (filteredResults.length === 0) {
        return (
            <div className="jumbotron">
                {`Sorry, no ${currentPattern} results detected`}
            </div>
        );
    }

    return (
        <div className="jumbotron pt-4">
            <table>
                <tbody>
                    <tr>
                        <th>Symbol</th>
                        <th>{title}</th>
                        <th>Signal</th>
                    </tr>
                    {
                        filteredResults.map((result, index) =>
                            <tr key={index}>
                                <td>{result.symbol}</td>
                                <td>{result.company ?? result.crypto}</td>
                                <td className={result[currentPattern]}>{result[currentPattern]}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ResultsTable;