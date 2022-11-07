import React from "react";

import "./DeleteUser.css";

const DeleteUser = ({ handleDeleteUser }) => {
  const [IsConfirm, setIsConfirm] = React.useState(false);

  return (
    <div className="delete-user">
      <div>
        <p className="delete-user-title">Supprimer le compte</p>
      </div>
      {IsConfirm ? (
        <div className="delete-user">
          <p className="delete-user-text">
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </p>
          <div className="delete-user-confirm-buttons">
            <button
              className="delete-user-confirm-button-cancel"
              onClick={() => setIsConfirm(false)}
            >
              Annuler
            </button>
            <button
              className="delete-user-confirm-button-confirm"
              onClick={handleDeleteUser}
            >
              Confirmer
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="delete-user-text">
            <p>
              Vous êtes sur le point de supprimer votre compte. Cette action est
              irréversible et entraînera la suppression de toutes vos données et
              publications.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsConfirm(true)}
              className="delete-user-button"
            >
              Supprimer le compte
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteUser;
