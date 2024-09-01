import Link from "next/link";
import Modal from "../../../../../../src/components/Modal";
import { API } from "../../../../../../src/gql/sanityApi";
import { fetchServer } from "@/fetch-server";
import { SearchEventsDocument } from "@/gql/graphql";
import Image from "next-export-optimize-images/remote-image";
import CommunityOSLogo from "@/components/Icons/JSChileLogo";

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
        <div className="after:content relative mb-5 flex flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-brand-primary px-6 py-16 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight">
          <CommunityOSLogo className="w-3/4 sm:w-1/2" />
          <h1 className="mt-8 mb-4 font-bold uppercase tracking-widest">
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
