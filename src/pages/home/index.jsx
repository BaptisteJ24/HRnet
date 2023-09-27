/**
 * description: Home page
 * @return {JSX} - Home page
 */
const Home = () => {
  return (
    <div className="homepage">
      <section className="homepage__section">
        <img src="/assets/logo.png" alt="HRnet logo" />
        <h2>Welcome in HRnet</h2>
        <div>
          <p>HRnet is a simple application to manage your employees.</p>
          <p>
            You can use the navigation bar to create or view your employees.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
