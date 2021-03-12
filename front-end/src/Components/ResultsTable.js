const ResultsTable = ({ stocks, currentPattern }) => {
    return (
        <div className="jumbotron">
            <table>
                <tr>
                    <th>Symbol</th>
                    <th>Company name</th>
                    <th>Signal</th>
                </tr>
                {
                    Object.values(stocks).map((stock) => {
                        if (stock[currentPattern]) {
                            return (
                                <tr>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.company}</td>
                                    <td>{stock[currentPattern]}</td>
                                </tr>
                            )
                        }
                    })
                }
            </table>
        </div>
    )
}

export default ResultsTable;