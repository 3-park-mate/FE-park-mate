import { useState } from 'react';

export function useAlertWithLoading() {
  const [loading, setLoading] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleAlert = (message: string) => {
    setModalMessage(message);
    setAlertModalOpen(true);
    setLoading(false);
  };

  return {
    loading,
    setLoading,
    alertModalOpen,
    setAlertModalOpen,
    modalMessage,
    setModalMessage,
    handleAlert,
  };
}
