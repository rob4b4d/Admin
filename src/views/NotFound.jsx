export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-message">Page Not Found</h2>
                <p className="not-found-description">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <a href="/" className="btn-back-home">Back to Home</a>
            </div>
        </div>
    );
}
