"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalType {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const Modal = createContext<ModalType>({
  isModalOpen: false,
  setModalOpen: () => {},
});

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Modal.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </Modal.Provider>
  );
};

export const useModal = () => useContext(Modal);
