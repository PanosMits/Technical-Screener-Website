import { useParams } from "react-router-dom";
import Dropdown from '../Components/Dropdown'
import patterns from '../Repositories/Patterns'

const Home = () => {
    const { pattern } = useParams();

    return (
        <div>
            <h3>HOME</h3>
            <Dropdown title={'Patterns'} data={patterns} />
        </div >
    )
}

export default Home;