import PropTypes from 'prop-types'

const Button = ({ text, onClick, disabled }) => {
    return (
        <div className="m-3">
            <button
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
        </div>

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
