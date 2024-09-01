import CommunityOSLogo from "../../src/components/Icons/JSChileLogo";
import { AnimatedNavigationCardLink } from "../../src/components/Transitions/AnimatedNavigationCardLink";
import { AnimatedContainer } from "../../src/components/Transitions/AnimatedGridContainer";
import React from "react";
import { fetchServer } from "@/fetch-server";
import { SearchEventsDocument } from "@/gql/graphql";
import Image from "next-export-optimize-images/remote-image";

export default async function Page() {
  const data = await fetchServer(
    SearchEventsDocument,
    {
      input: {
        search: {
          name: "AI Hackathon",
          id: null,
          startDateTimeFrom: null,
          startDateTimeTo: null,
          status: null,
          ticketTags: null,
          userHasTickets: null,
          visibility: null,
        },
        pagination: {
          page: 0,
          pageSize: 1,
        },
      },
    },
    "force-cache",
  );

  const communityEvents = data.searchEvents.data ?? [];

  return (
    <main className="mx-auto max-w-[1960px] p-4 flex-1">
      <AnimatedContainer className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="after:content relative flex flex-grow-0 row-span-1 md:row-span-2 flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-brand-primary px-6 py-8 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0"></span>
          </div>
          <CommunityOSLogo className="w-1/4 sm:w-1/2" />
          <h1 className="mt-8 mb-4 font-bold uppercase tracking-widest font-koulen">
            CommunityOS
          </h1>
          <p className="z-10 max-w-[40ch] sm:max-w-[32ch]">
            ¡Revive los eventos de la comunidad de CommunityOS! Tienes fotos que
            quieras compartir? Envíanos un correo a{" "}
            <a className="font-bold" href="mailto:contacto@communityos.io">
              contacto@communityos.io
            </a>
          </p>
        </div>

        {communityEvents.map(({ id, name, galleries }) => {
          return (
            <React.Fragment key={id}>
              {galleries.map((gallery) => {
                const image = gallery.images[0] ?? null;

                return (
                  <AnimatedNavigationCardLink
                    id={gallery.id}
                    key={gallery.id}
                    href={`/event/${gallery.id}`}
                    className="after:content group relative block w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                  >
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <span className="absolute left-0 z-10 right-0 bottom-0 h-[50%] "></span>
                      <div className="absolute bottom-0 text-white  z-20 left-0 right-0 flex gap-2 flex-col w-fill h-[50%] items-end justify-end">
                        <h2 className="px-4 py-3 w-fill flex justify-center items-center bg-black/80 flex-col gap">
                          <span className="font-bold text-lg drop-shadow-md">
                            {name}
                          </span>
                        </h2>
                        <span className="px-4 py-2 flex justify-center items-center font-bold bg-black/80 drop-shadow-md">
                          {gallery.description}
                        </span>
                      </div>
                    </div>
                    {image && (
                      <Image
                        alt="CommunityOS Event"
                        className="transform rounded-lg brightness-90 z-0 transition will-change-auto group-hover:brightness-110 min-h-full w-full object-cover"
                        style={{ transform: "translate3d(0, 0, 0)" }}
                        id={id}
                        src={image.url}
                        width={720}
                        height={480}
                        sizes="(max-width: 640px) 25w,
                  (max-width: 1280px) 33w,
                  (max-width: 1536px) 100w,
                  35w"
                      />
                    )}
                  </AnimatedNavigationCardLink>
                );
              })}
            </React.Fragment>
          );
        })}
      </AnimatedContainer>
    </main>
  );
}
