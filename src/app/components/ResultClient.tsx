"use client";

import React, { ReactNode } from "react";
import { ModalProvider } from "../utilities/Modal";

interface ResultClientWrapperProps {
  children: ReactNode;
}

const ResultClient: React.FC<ResultClientWrapperProps> = ({
  children,
}) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default ResultClient;
