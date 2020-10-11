import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const WithSpinner = (WrappedComponent) => {
    const WithSpinnerComponent = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <Spinner animation="border" role="status" 
                style={{ display: 'block', marginTop: 100, marginLeft: 'auto', marginRight: 'auto' }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        ) : (
                <WrappedComponent {...otherProps} />
            );
    }

    return WithSpinnerComponent;
};

export default WithSpinner;