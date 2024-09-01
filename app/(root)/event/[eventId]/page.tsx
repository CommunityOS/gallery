import Modal from "../../../../src/components/Modal";
import { API } from "../../../../src/gql/sanityApi";
import { AnimatedNavigationCardLink } from "../../../../src/components/Transitions/AnimatedNavigationCardLink";
import { AnimatedContainer } from "../../../../src/components/Transitions/AnimatedGridContainer";
import { EventCard } from "../../../../src/components/EventCard";
import { fetchServer } from "@/fetch-server";
import { SearchEventsDocument } from "@/gql/graphql";
import Image from "next-export-optimize-images/remote-image";
import "./page.module.css";
import { cn } from "@/lib/utils";

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
    return galleries.map(({ id }) => {
      return {
        eventId: id,
      };
    });
  });

  return params;
}

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;
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

  const imagesWithIndex = gallery.images.map((image, index) => ({
    ...image,
    index,
  }));

  const eventName = gallery.description
    ? `${event.name} ${gallery.description}`
    : event.name;

  const image = gallery.images.length > 0 ? gallery.images[0] : null;

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <Modal images={imagesWithIndex} eventId={eventId} />
      <AnimatedContainer className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 md:grid xl:grid-cols-4">
          <EventCard eventName={eventName} photo={image} />

          {gallery.images.slice(0, 2).map(({ id, url }, index) => {
            return (
              <AnimatedNavigationCardLink
                id={id}
                key={id}
                href={`/event/${eventId}/photo/${id}`}
                as={`/event/${eventId}?photoId=${id}`}
                scroll={false}
                shallow
                prefetch={true}
                className={cn(
                  "after:content group relative block w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight",
                  index === 1 ? "md:hidden lg:block" : "",
                )}
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
              </AnimatedNavigationCardLink>
            );
          })}
        </div>

        <div className="gallery-grid sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {gallery.images.slice(1).map(({ id, url }, index) => {
            return (
              <AnimatedNavigationCardLink
                id={id}
                key={id}
                href={`/event/${eventId}/photo/${id}`}
                as={`/event/${eventId}?photoId=${id}`}
                scroll={false}
                shallow
                prefetch={true}
                className={cn(
                  "gallery-item relative block w-full cursor-pointer mb-4 break-inside-avoid group",
                  index === 0 ? "hidden md:block lg:hidden" : "",
                )}
              >
                <Image
                  alt=""
                  className="rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 transform"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  id={id}
                  src={url}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33.33vw, 25vw"
                />
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow-highlight"></div>
              </AnimatedNavigationCardLink>
            );
          })}
        </div>
      </AnimatedContainer>
    </main>
  );
}
