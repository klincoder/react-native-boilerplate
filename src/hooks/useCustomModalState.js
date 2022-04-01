// Import resources
import { useState } from "react";

// Component
function useCustomModalState() {
  // Define modal state
  const [modalVisible, setModalVisible] = useState(false);

  // FUNCTIONS
  // HANDLE SHOW & HIDE MODAL
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Return component
  return { modalVisible, showModal, hideModal };
}

// Export
export default useCustomModalState;
