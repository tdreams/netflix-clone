const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover relative">
      <nav className="absolute top-10 left-10 z-50">
        <img src="/images/logo.png" alt="Logo" className="h-12" />
      </nav>
      <div className="bg-black w-full h-full lg:bg-opacity-50 absolute" />
      {children}
    </div>
  );
};

export default AuthLayout;
