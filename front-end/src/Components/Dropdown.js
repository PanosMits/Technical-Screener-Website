import { Dropdown } from 'react-bootstrap';

const DropdownComponent = ({ title, data }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {data.map((datum) => (
                    <Dropdown.Item href={datum.value} key={datum.id}>
                        {datum.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownComponent
