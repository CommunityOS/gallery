import Link from "next/link";
import Logo from "../../../../../../src/components/Icons/Logo";
import Modal from "../../../../../../src/components/Modal";
import { API } from "../../../../../../src/gql/sanityApi";
import { fetchServer } from "@/fetch-server";
import { SearchEventsDocument } from "@/gql/graphql";
import Image from "next-export-optimize-images/remote-image";

export async function generateStaticParams() {
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

  const params = data.searchEvents.data.flatMap(({ galleries }) => {
    return galleries.flatMap(({ id: galleryId, images }) => {
      return images.map(({ id: photoId }) => ({
        eventId: galleryId,
        photoId: photoId,
      }));
    });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: { eventId: string; photoId: string };
}) {
  const { eventId, photoId } = params;
  const data = await API.searchEvents({
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
  });

  const event =
    data.searchEvents.data.length > 0 ? data.searchEvents.data[0] : null;

  const gallery = event
    ? event.galleries.find((gallery) => gallery.id === eventId)
    : null;

  const image = gallery.images.find((image) => image.id === photoId) ?? null;
  const imagesWithIndex = gallery.images.map((image, index) => ({
    ...image,
    index,
  }));

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <Modal
        images={imagesWithIndex}
        eventId={eventId}
        forcedPhotoId={photoId}
      />
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-brand-primary px-6 pb-16 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center"></span>
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <Logo color="#000" />
          <h1 className="mt-8 mb-4 text-black font-bold uppercase tracking-widest">
            JSConf CHILE 2023
          </h1>
          <p className="z-10 max-w-[40ch] text-black/80 sm:max-w-[32ch]">
            Revive la primera conferencia de JavaScript de Chile! Tienes fotos
            que quieras agregar?{" "}
            <a className="font-bold" href="mailto:contacto@communityos.io">
              contacto@communityos.io
            </a>
          </p>
          <a
            className="pointer z-10 mt-6 rounded-lg border border-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-white md:mt-4 bg-black"
            href="https://github.com/JSConfCL/2023_images"
            target="_blank"
            rel="noreferrer"
          >
            Github Repo
          </a>
        </div>
        {[image].map(({ id, url }) => {
          return (
            <Link
              key={id}
              href={`/event/${eventId}?photoId=${id}`}
              scroll={false}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt=""
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                id={id}
                src={url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 25w,
                  (max-width: 1280px) 33w,
                  (max-width: 1536px) 100w,
                  35w"
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
