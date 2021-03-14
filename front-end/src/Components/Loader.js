import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div>
            <Spinner animation="grow" variant="info" className="m-2" />
            <Spinner animation="grow" variant="info" className="m-2" />
            <Spinner animation="grow" variant="info" className="m-2" />
        </div>
    )
}

export default Loader
