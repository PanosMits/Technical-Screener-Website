import PropTypes from 'prop-types'

const Button = ({ text, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            className='btn btn-outline-primary'
            disabled={disabled}
        >
            {text}
        </button>
    )
}

Button.defaultProps = {
    text: 'I am a button',
    disabled: false,
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}

export default Button;
