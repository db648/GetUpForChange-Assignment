import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("submit", data);
    axios
      .post("https://getupforchange-noticeboard.herokuapp.com/user/register", data)
      .then((res) => {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message)
        alert("Try another Email");
      });
  };

  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                <div className="card-body p-4 p-md-5">
                  <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Create New Account
                  </h2>

                  <form className="px-md-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        {...register("username", { required: true,minLength:3 })}
                      />
                      {errors.username && "Enter valid name"}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        {...register("email", { required: true })}
                      />
                      {errors.email && "Enter valid email"}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        {...register("password", { required: true,minLength:8 })}
                      />
                      {errors.password && "Enter valid password"}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      
                            <button className="btn fw-bold text-body" onClick={() => {
                                navigate("/login")
                            }}><u>Login here</u></button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
