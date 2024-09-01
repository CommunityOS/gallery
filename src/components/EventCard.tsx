import Image from "next-export-optimize-images/remote-image";
import React from "react";
import { SearchEventsQuery } from "@/gql/graphql";

type Props = {
  eventName: string;
  photo: SearchEventsQuery["searchEvents"]["data"][0]["galleries"][0]["images"][0];
};

export const EventCard = ({ eventName, photo }: Props) => {
  return (
    <div className="relative flex flex-end sm:col-span-2 md:col-span-1 xl:col-span-2 flex-col items-center justify-end gap-4 overflow-hidden rounded-lg p-6 text-center text-white shadow-highlight">
      <div className="absolute -inset-1 blur-[1px] bg-blend-darken opacity-40">
        <Image
          alt=""
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          style={{ transform: "translate3d(0, 0, 0)" }}
          id={photo.id}
          src={photo.url}
          width={950}
          height={430}
          sizes="(max-width: 640px) 25w,
                  (max-width: 1280px) 33w,
                  (max-width: 1536px) 100w,
                  35w"
        />
      </div>
      <h1 className="z-10 mt-8 mb-4 font-bold uppercase tracking-widest font-koulen text-xl">
        {eventName}
      </h1>

      <p className="z-10 max-w-[40ch] sm:max-w-[32ch]">
        Tienes fotos que quieras compartir? Envíanos un correo a{" "}
        <a className="font-bold" href="mailto:contacto@communityos.io">
          contacto@communityos.io
        </a>
      </p>
    </div>
  );
};
