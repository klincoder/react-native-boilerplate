// Import resources
import { useState } from "react";

// Component
const useCustomSpinnerState = () => {
  // Define state
  const [loading, setLoading] = useState(false);

  // FUNCTIONS
  // SHOW LOADING
  const showLoading = () => setLoading(true);
  // HIDE LOADING
  const hideLoading = () => setLoading(false);

  // Return component
  return { loading, showLoading, hideLoading }; // close return
}; // close component

// Export
export default useCustomSpinnerState;
