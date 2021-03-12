const ResultsTable = ({ data }) => {
    return (
        <div className="jumbotron">
            <table>
                <tr>
                    <th>Symbol</th>
                    <th>Company name</th>
                    <th>Signal</th>
                </tr>
                {console.log(data.current_pattern)}
                {/* {data.map((datum) => console.log(datum))} */}
                {/* {% for stock in stocks %}
                    {% if stocks[stock][current_pattern] %}
                        <tr>
                        <td>{{ stock }}</td>
                        <td>{{ stocks[stock]['company'] }}</td>
                        <td class="{{ stocks[stock][current_pattern] }}">{{ stocks[stock][current_pattern] }}</td>
                    </tr>
                    {% endif %}
                {% endfor %} */}
            </table>
        </div>
    )
}

export default ResultsTable;