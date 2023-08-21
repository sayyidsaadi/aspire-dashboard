const PopupModal = ({ title, targetId, children }) => {
  return (
    <>
      <div className="modal fade" id={targetId}>
        <div className="modal-dialog modal-dialog-centered " rel="document">
          <div className="modal-content bg-secondary">
            <div className="modal-header">
              <h4>{title}</h4>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
