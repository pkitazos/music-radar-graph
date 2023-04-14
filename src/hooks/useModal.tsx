import {
  FC,
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// TODO: handle ts issues

interface modalContent {
  setModal: Dispatch<SetStateAction<JSX.Element>> | undefined;
}

let modalContext = createContext<modalContent>({
  setModal: undefined,
});

interface props {
  children: ReactNode | ReactNode[];
}
export let ModalProvider: FC<props> = ({ children }) => {
  let [modal, setModal] = useState(<div />);

  return (
    <>
      <modalContext.Provider value={{ setModal: setModal }}>
        {modal}
        {children}
      </modalContext.Provider>
    </>
  );
};

let useModal = (modal: JSX.Element) => {
  let { setModal } = useContext(modalContext);

  if (setModal === undefined) {
    console.error("useModal reference outside of a modal context");
    return () => {};
  }
  // @ts-ignore
  return () => setModal(modal);
};

export default useModal;
