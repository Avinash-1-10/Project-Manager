const Modal = ({ isVisible, hideModal, children }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-900 border border-gray-700 p-6 rounded shadow-lg w-96">
          <div className="">
            {children}
          </div>
          <div className=" mt-4">
            <button onClick={hideModal} className="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  