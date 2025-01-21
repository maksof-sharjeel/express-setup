import { z } from "zod";
import { urlSchema } from "../app/validators/url.schema";
export type UrlDTO = z.infer<typeof urlSchema>;
export type UrlResponseDTO = {
  message: string;
  shortUrl: string;
};
export type ShortUrlResponseDTO = {
  shortUrl: {
    url: string;
    code: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }[]; 
};

