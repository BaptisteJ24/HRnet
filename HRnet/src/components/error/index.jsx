import { Link } from "react-router-dom";

/**
 * description: Error component for 404 page
 * @return {JSX} - Error component
 */
const Error = () => {
  return (
    <section className="error">
      <h1 className="error__title">Error 404</h1>
      <p className="error__text">Page not found</p>
      <Link to="/" className="error__link">
        Return to Homepage
      </Link>
    </section>
  );
};

export default Error;
