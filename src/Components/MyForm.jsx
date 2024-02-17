import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const MyForm = ({ setDisplayName }) => {
  const [hideToast, setHideToast] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);
  const [firstFocus, setFirstFocus] = React.useState({
    name: false,
    nickname: false,
    email: false,
  });
  const [formData, setFormData] = React.useState({
    name: "",
    nickname: "",
    email: "",
    useNickname: true,
  });
  const [invalidDataMsg, setIvalidDataMsg] = React.useState({
    name: "",
    nickname: "",
    email: "",
  });

  function validateName() {
    const regex = /^[a-zA-Z]*$/;
    const name = formData.name;
    setIvalidDataMsg((prevData) => {
      let message = "";
      if (name.length < 3) {
        message = "Name must be more than 3 characters";
      } else if (!regex.test(name)) {
        message = "Name can only contain alphateic characters";
      }
      return {
        ...prevData,
        name: message,
      };
    });
  }

  function validateNickname() {
    const regex = /^[a-zA-Z]*$/;
    const nickname = formData.nickname;
    setIvalidDataMsg((prevData) => {
      let message = "";
      if (nickname.length < 3) {
        message = "Nickname must be more than 3 characters";
      } else if (!regex.test(nickname)) {
        message = "Nickname can only contain alphateic characters";
      }
      return {
        ...prevData,
        nickname: message,
      };
    });
  }

  function validateEmail() {
    const regex = /^\S+@\S+\.\S+$/;
    const email = formData.email;
    setIvalidDataMsg((prevData) => ({
      ...prevData,
      email: !regex.test(email) ? "Invalid Email" : "",
    }));
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  useEffect(() => {
    validateName();
  }, [formData.name]);

  useEffect(() => {
    validateNickname();
  }, [formData.nickname]);

  useEffect(() => {
    validateEmail();
  }, [formData.email]);

  useEffect(() => {
    setIsValid(checkValid());
  });

  function checkValid() {
    let valid = true;
    Object.values(invalidDataMsg).map((el) => {
      valid = valid && !el;
    });
    return valid;
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (checkValid()) {
      setDisplayName(formData.useNickname ? formData.nickname : formData.name);
      setHideToast(false);
    } else {
      console.log("An error occurred");
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => {
                setFirstFocus((prevFocus) => ({
                  ...prevFocus,
                  name: true,
                }));
              }}
              isInvalid={!!invalidDataMsg.name && firstFocus.name}
              isValid={!invalidDataMsg.name && !!formData.name}
            />
            <Form.Control.Feedback type={"invalid"}>
              {invalidDataMsg.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nickname">Nickname</Form.Label>
            <Form.Control
              id="nickname"
              name="nickname"
              value={formData.nickname}
              placeholder="Enter your nickname"
              onChange={handleChange}
              onFocus={() => {
                setFirstFocus((prevFocus) => ({
                  ...prevFocus,
                  nickname: true,
                }));
              }}
              isInvalid={!!invalidDataMsg.nickname && firstFocus.nickname}
              isValid={!invalidDataMsg.nickname && !!formData.nickname}
            />
            <Form.Control.Feedback type={"invalid"}>
              {invalidDataMsg.nickname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email address</Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => {
                setFirstFocus((prevFocus) => ({
                  ...prevFocus,
                  email: true,
                }));
              }}
              isInvalid={!!invalidDataMsg.email && firstFocus.email}
              isValid={!invalidDataMsg.email && !!formData.email}
            />
            <Form.Control.Feedback type={"invalid"}>
              {invalidDataMsg.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="disabledFieldsetCheck"
              name="useNickname"
              checked={formData.useNickname}
              onChange={handleChange}
              label="Use you nickname as your display name?"
            />
          </Form.Group>
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </fieldset>
      </Form>
      <ToastContainer
        className="p-3"
        position="bottom-center"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => {
            setHideToast((prevToast) => !prevToast);
          }}
          style={{
            background: "#BDF0D6",
          }}
          show={!hideToast}
        >
          <Toast.Header
            closeButton={true}
            style={{
              background: "#BDF0D6",
            }}
          >
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />

            <strong className="me-auto">Sucess</strong>
          </Toast.Header>
          <Toast.Body>The Form submission was a sucess!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default MyForm;
