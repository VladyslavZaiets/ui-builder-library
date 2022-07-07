export const HalfPointControll = ({
  icon,
  iconColor,
  disabled,
  checked,
  inputValue,
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor={ inputValue }
        className="rating-icon__label half-icon">
        <span className="rating-icon__span">
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={ iconColor }
            className="rating-icon__svg">
            <path d={ icon } />
          </svg>
        </span>
      </label>
      <input
        type="radio"
        name="rating"
        value={ inputValue }
        id={ inputValue }
        disabled={ disabled }
        checked={ checked }
        className="rating-icon__input"
        onChange={ onChange }
      />
    </>
  );
};