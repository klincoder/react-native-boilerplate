// Import resources
import { useState } from "react";

// Component
const useCustomSpinnerState = () => {
  // Define state
  const [loading, setLoading] = useState(false);

  // Show loading
  const showLoading = () => setLoading(true);

  // Hide loading
  const hideLoading = () => setLoading(false);

  // Return component
  return { loading, showLoading, hideLoading };
};

// Export
export default useCustomSpinnerState;
