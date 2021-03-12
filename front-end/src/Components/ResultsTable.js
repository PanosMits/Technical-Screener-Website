const ResultsTable = ({ stocks, currentPattern }) => {
    const filteredStocks = Object.values(stocks).filter((stock) => {
        return stock[currentPattern];
    });

    if (filteredStocks.length === 0) {
        return (
            <div className="jumbotron">
                {`Sorry, no ${currentPattern} results detected`}
            </div>
        );
    }

    return (
        <div className="jumbotron">
            <table>
                <tbody>
                    <tr>
                        <th>Symbol</th>
                        <th>Company name</th>
                        <th>Signal</th>
                    </tr>
                    {
                        filteredStocks.map((stock, index) =>
                            <tr key={index}>
                                <td>{stock.symbol}</td>
                                <td>{stock.company}</td>
                                <td>{stock[currentPattern]}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ResultsTable;