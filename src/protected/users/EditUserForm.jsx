import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../lib/constants/roles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateUserMutation from "../../api/users/mutations/updateUser";
import deleteUserMutation from "../../api/users/mutations/deleteUser";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateUser,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
  } = useMutation({
    mutationFn: updateUserMutation,
    onSuccess: () => {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Delete user mutation - with renamed destructured properties
  const {
    mutateAsync: deleteUser,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteUserMutation,
    onSuccess: () => {
      navigate("/dash/users");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user._id, username, password, roles, active });
    } else {
      await updateUser({ id: user._id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user._id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      ([roles.length, validUsername, validPassword].every(Boolean) &&
        !isUpdateLoading) ||
      !isDeleteLoading;
  } else {
    canSave =
      ([roles.length, validUsername].every(Boolean) && !isUpdateLoading) ||
      !isDeleteLoading;
  }

  const errClass = isUpdateError || isDeleteError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !roles.length ? "form__input--incomplete" : "";

  const errContent = (updateError?.message || deleteError?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <p style={{ position: "absolute", left: 0 }} className="general-btn">
            <Link to="/dash/users">Back</Link>
          </p>
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <p>Hold Ctrl(Window)/Cmd(Mac) for multyselection</p>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};
export default EditUserForm;
