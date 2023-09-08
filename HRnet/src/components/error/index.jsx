import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error">
      <h1 className="error__title">404</h1>
      <p className="error__text">Page not found</p>
      <Link to="/">Return to Homepage</Link>
    </section>
  );
};

export default Error;
