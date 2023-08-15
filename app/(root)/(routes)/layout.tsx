"use client";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import { Skeleton } from "@/components/ui/skeleton";
import UseFav from "@/hooks/useFav";
import useInfoModal from "@/hooks/useInfoModel";
import useMovL from "@/hooks/useMovL";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: favorites = [], isLoading } = UseFav();
  const { data: movies = [] } = useMovL();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div className="">
      {children}
      <MovieList title="Trending Now" data={movies} isLoading={isLoading} />
      <MovieList title="My List" data={favorites} isLoading={isLoading} />
      <div className="">
        <InfoModal visible={isOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default AuthLayout;
