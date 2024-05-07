import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      <img
        src="assets/backgroundImg.jpg"
        alt="background Image"
        className="hidden object-contain rounded-[20px] max-h-[1080px] mx-4 bg-no-repeat lg:block my-4"
      />
      <div className="absolute top-8 left-8">
        <img src="assets/logo.png" alt="Logo" className="w-auto h-8" />
      </div>
      <section className="flex flex-col items-center justify-center flex-1 py-10 ml-5">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
