"use client";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModel";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeModal } = useInfoModal();
  return (
    <div className="">
      {children}
      <div className="">
        <InfoModal visible={isOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default AuthLayout;
