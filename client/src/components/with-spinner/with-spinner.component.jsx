import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const WithSpinner = (WrappedComponent) => {
    const WithSpinnerComponent = ({ isLoading, ...otherProps }) => {
        return isLoading ? (
            <div style={ {display: 'flex', justifyContent: 'center'} } >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    }

    return WithSpinnerComponent;
};

export default WithSpinner;