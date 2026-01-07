import { Header } from '../components/Header';
import './pageNotFound.css';

export function PageNotFound({cart}) {

    return (
        <>
            <Header cart={cart} />

            <div className="page-not-found-container">
                <div className="error-container">
                    Error 404: Page Not Found
                </div>
            </div>
        </>
    )
};