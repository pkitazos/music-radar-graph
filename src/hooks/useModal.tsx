import type { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

// TODO: handle ts issues

interface modalContent {
  setModal: Dispatch<SetStateAction<JSX.Element>> | undefined;
}

const modalContext = createContext<modalContent>({
  setModal: undefined,
});

interface props {
  children: ReactNode | ReactNode[];
}
export const ModalProvider: FC<props> = ({ children }) => {
  const [modal, setModal] = useState(<div />);

  return (
    <>
      <modalContext.Provider value={{ setModal: setModal }}>
        {modal}
        {children}
      </modalContext.Provider>
    </>
  );
};

const useModal = (modal: JSX.Element) => {
  const { setModal } = useContext(modalContext);

  if (setModal === undefined) {
    console.error("useModal reference outside of a modal context");
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }
  return () => setModal(modal);
};

export default useModal;
