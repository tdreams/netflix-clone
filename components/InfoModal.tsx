"use client";
import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModel";
import useMovie from "@/hooks/useMovie";
import { Movie } from "@/types";
import { cn } from "@/lib/utils";

interface InfoModalProps {
  visible: boolean;
  onClose: any;
}

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
  const [isVisible, setIsvisible] = useState(!!visible);
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movieId } = useInfoModal();

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await useMovie(movieId);
      setMovie(fetchedMovie);
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    setIsvisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsvisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  if (!visible) {
    return null;
  }
  return (
    <div
      className={cn(
        isVisible
          ? "z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0"
          : ""
      )}
    >
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={cn(
            "transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md",
            isVisible ? "scale-90" : "scale-0"
          )}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              poster={movie?.thumbnailUrl}
              src={movie?.videoUrl}
            ></video>
            <div
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movie?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={movie?.id} />
                <FavoriteButton movieId={movie?.id} />
              </div>
            </div>
          </div>
          <div className="py-8 px-12 ">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{movie?.duration}</p>
            <p className="text-white text-lg">{movie?.genre}</p>
            <p className="text-white text-lg">{movie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
