import { Component } from "react";
import { Link } from "react-router-dom";

// Note
// Error boundaries do not catch errors for:

// Event handlers
// Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
// Server-side rendering
//Errors thrown in the error boundary itself (rather than its children)
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: {} };
      }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({...this.state, error: error})
  }

  render() {
    const {error, hasError} = this.state;

    if (hasError) {
      return (
        <>
            <h2>
                {error.message}
            </h2>
            <button>Back to profile</button>
        </>
      );
    }

    return this.props.children;
  }
}