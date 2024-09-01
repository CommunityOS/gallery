import { SearchEventsQuery } from "@/gql/jschileAPI";

/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: string;
  url: string;
  index: number;
  blurDataUrl?: string;
}

export interface SharedModalProps {
  index: number;
  images?: (SearchEventsQuery["searchEvents"]["data"][0]["galleries"][0]["images"][0] & {
    index: number;
  })[];
  currentPhoto?: SearchEventsQuery["searchEvents"]["data"][0]["galleries"][0]["images"][0] & {
    index: number;
  };
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
  galleryId: string;
}
