import React from "react";
import { Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

const InputForm = ({ type, placeholder, required }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
    },
  });

  const onSubmit = (data) => console.log(data);
  const {
    setError,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Form.Control
              onChange={onChange}
              value={value}
              ref={ref}
              type={type}
              placeholder={placeholder}
            />
          )}
        />
      </Form.Group>
    </Form>
  );
};

export default InputForm;
