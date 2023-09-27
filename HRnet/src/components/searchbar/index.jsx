import PropTypes from "prop-types";

/**
 * description: Searchbar component
 * @param {Object} props - Props of the component
 * @param {string} props.filterText - Text to filter
 * @param {function} props.onFilter - Function to filter
 * @param {function} props.onClear - Function to clear the filter
 * @param {string} props.className - Class name of the component
 * @return {JSX} - Searchbar component
 */
const SearchBar = ({ filterText, onFilter, onClear, className }) => {
  return (
    <div className={className !== "" ? `searchbar ${className}` : "searchbar"}>
      <label className="searchbar__label">
        <p className="searchbar__text">Filter :</p>
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
        <span className="sr-only searchbar__reset__text">reset</span>
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
