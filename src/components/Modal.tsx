"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";
import SharedModal from "./SharedModal";
import { SearchEventsQuery } from "@/gql/graphql";

const InternalModal = ({
  images,
  handleClose,
  eventId,
  photoId,
}: {
  images: (SearchEventsQuery["searchEvents"]["data"][0]["galleries"][0]["images"][0] & {
    index: number;
  })[];
  handleClose: () => void;
  eventId: string;
  photoId: string;
}) => {
  const router = useRouter();
  let index = Number(images.findIndex((el) => el.id === photoId));

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(`/event/${eventId}?photoId=${images[newVal].id}`, {
      scroll: false,
    });
  }

  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });
  return (
    <SharedModal
      index={curIndex}
      direction={direction}
      images={images}
      changePhotoId={changePhotoId}
      closeModal={handleClose}
      navigation={true}
      galleryId={eventId}
    />
  );
};

function Modal({
  images,
  eventId,
  forcedPhotoId,
}: {
  images: (SearchEventsQuery["searchEvents"]["data"][0]["galleries"][0]["images"][0] & {
    index: number;
  })[];
  eventId: string;
  forcedPhotoId?: string;
}) {
  let overlayRef = useRef();
  const photoId = useSearchParams().get("photoId");
  const finalPhotoId = forcedPhotoId || photoId;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  function handleClose() {
    setIsOpen(false);
    router.push(`/event/${eventId}`);
  }

  useEffect(() => {
    if (finalPhotoId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [finalPhotoId]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200 delay-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 bg-black/70 backdrop-blur-2xl" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 delay-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="fixed inset-0 z-20">
            <InternalModal
              images={images}
              handleClose={handleClose}
              eventId={eventId}
              photoId={finalPhotoId}
            />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default function ModalSSR({
  images,
  eventId,
  forcedPhotoId,
}: {
  images: (SearchEventsQuery["searchEvents"]["data"][0]["galleries"][0]["images"][0] & {
    index: number;
  })[];
  eventId: string;
  forcedPhotoId?: string;
}) {
  return (
    <Suspense>
      <Modal images={images} eventId={eventId} forcedPhotoId={forcedPhotoId} />
    </Suspense>
  );
}
