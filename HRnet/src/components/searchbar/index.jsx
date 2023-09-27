import PropTypes from "prop-types";

const SearchBar = ({ filterText, onFilter, onClear, className }) => {
  return (
    <div className={className !== "" ? `searchbar ${className}` : "searchbar"}>
      <label className="searchbar__label">
        <p className="searchbar__label__text">Filter :</p>
        <input
          type="search"
          className="searchbar__input"
          value={filterText}
          onChange={onFilter}
        />
      </label>
      <button type="reset" className="searchbar__reset" onClick={onClear}>
        <i
          className="fas fa-xmark searchbar__reset__icon"
          aria-hidden="true"
        ></i>
        <span className="sr-only">reset</span>
      </button>
    </div>
  );
};

SearchBar.defaultProps = {
  className: "",
};

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SearchBar;
