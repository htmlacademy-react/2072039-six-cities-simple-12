import { Link } from 'react-router-dom';


function NotFoundPage(): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <div className="cities">
        <div className="cities__places-container container">
          <div>
            <h2>404 Page not found</h2>
            <div>
              <Link to="/">
                <button>Return to home page</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
