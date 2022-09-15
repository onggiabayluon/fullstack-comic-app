import classNames from "classnames/bind";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "~/components/Button";
import styles from "./LoginForm.module.scss";

const cx = classNames.bind(styles);

function SignupForm() {
  // const { loginUser } = useContext(UserContext);

  const { register, handleSubmit, formState, reset, watch } = useForm({
    mode: "onChange",
  });
  const { isValid, isDirty } = formState;

  useEffect(() => {
    const subscription = watch(() => {});

    // Remove watch after unmount
    return () => subscription.unsubscribe();
  }, [watch]);

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData); // convert the FormData object to a JSON object

    // return loginUser(username, password);
  };

  return (
    <form className={"p-2"} onSubmit={submitForm}>
      <div className={cx("input-container")}>
        <div className={cx("description-container")}>
          <label className={cx("label")}>Email or username</label>
        </div>
        <input
          type="text"
          {...register("username", {
            required: { value: true, message: "username is required" },
          })}
          className={cx("input")}
          placeholder="username"
        />
        {formState.errors.username && (
          <p className="text-danger">{formState.errors.username.message}</p>
        )}
      </div>

      <div className={cx("input-container")}>
        <input
          type="password"
          {...register("password", {
            minLength: { value: 6, message: "password is too short (min: 6)" },
            required: { value: true, message: "password is required" },
          })}
          className={cx("input")}
          placeholder="password"
        />
        {formState.errors.password && (
          <p className="text-danger">{formState.errors.password.message}</p>
        )}
      </div>

      <div className={cx("input-container")}>
        <input
          type="password"
          {...register("password2", {
            minLength: {
              value: 6,
              message: "Confirm password is too short (min: 6)",
            },
            required: { value: true, message: "Confirm password is required" },
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          })}
          className={cx("input")}
          placeholder="Confirm password"
        />
        {formState.errors.password2 && (
          <p className="text-danger">{formState.errors.password2.message}</p>
        )}
      </div>

      <div className={cx("input-container")}>
        <div className={cx("description-container")}>
          <label className={cx("label-light")}>Forgot password?</label>
        </div>
      </div>

      <br />

      <Button
        {...(!isDirty || !isValid ? { disabled: true } : { primary: true })}
        block
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}

export default SignupForm;
