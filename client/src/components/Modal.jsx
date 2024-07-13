import { IoMdClose } from "react-icons/io";

const Modal = ({ isVisible, hideModal, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 border border-gray-700 p-6 rounded shadow-lg relative">
        <div
          className="absolute top-1 right-1 p-2 text-white text-lg cursor-pointer rounded-full hover:bg-gray-800 transition-all duration-300"
          onClick={hideModal}
        >
          <IoMdClose />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
