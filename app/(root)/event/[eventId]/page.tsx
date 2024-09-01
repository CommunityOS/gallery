import Modal from "../../../../src/components/Modal";
import { API } from "../../../../src/gql/sanityApi";
import { AnimatedNavigationCardLink } from "../../../../src/components/Transitions/AnimatedNavigationCardLink";
import { AnimatedGridContainer } from "../../../../src/components/Transitions/AnimatedGridContainer";
import { EventCard } from "../../../../src/components/EventCard";
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
      <AnimatedGridContainer>
        <EventCard eventName={eventName} photo={image} />
        {gallery.images.map(({ id, url }) => {
          return (
            <AnimatedNavigationCardLink
              id={id}
              key={id}
              href={`/event/${eventId}/photo/${id}`}
              as={`/event/${eventId}?photoId=${id}`}
              scroll={false}
              shallow
              prefetch={true}
              className="after:content group relative block w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
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
      </AnimatedGridContainer>
    </main>
  );
}
