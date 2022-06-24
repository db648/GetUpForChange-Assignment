export const Login = () => {
  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-8 col-xl-6">
              <div className="card rounded-3">
                {/* <img
                  src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Homepage-Banner_3.jpg?format=webp&w=1366&dpr=1.0"
                  className="w-100"
                  alt="Sample photo"
                /> */}

                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-5 pb-5 pb-md-0 mb-md-5 px-md-2">Sign In</h3>

                  <form className="px-md-2">
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Login
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Create New Account here{" "}
                      <button
                        className="btn fw-bold text-body"
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        <u>Register here</u>
                      </button>
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
