import './Button.css';

const Button = ({ onClickCallback, isDisabled }) => {
    console.log(isDisabled);
    return <button
        disabled={isDisabled}
        type='submit'
        onClick={
            () => {
                onClickCallback();
            }
        }

    >
        Submit
    </button>
}

export default Button;