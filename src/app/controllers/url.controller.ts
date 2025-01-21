import { Request, Response } from 'express';
import prisma from '../../config/prisma.client';
import { urlSchema } from '../validators/url.schema';
import { ShortUrlResponseDTO, UrlDTO, UrlResponseDTO } from '../../types/url.types';
var TinyURL = require('tinyurl');

const UrlController = {
    shortUrl: async (
        req: Request<{}, {}, UrlDTO>,
        res: Response
    ) => {
        try {
            const { url } = urlSchema.parse(req.body);
            TinyURL.shorten(url, async (shortUrl: any, err: any) => {
                if (err) {
                    console.error('Error while shortening URL:', err);
                    return res.status(400).json({ message: 'Error while creating short URL', error: err.message });
                }
                await prisma.shortUrl.create({
                    data: {
                        code: shortUrl.split('/').pop(),
                        url: url,
                    },
                });
                const response: UrlResponseDTO = {
                    message: 'Short URL created successfully',
                    shortUrl: shortUrl,
                };
                res.status(201).json(response);
            });
        } catch (error: any) {
            console.error('Error while creating short URL:', error);
            res.status(400).json({ message: "Error", error: error.message });
        }
    },
    getAllShortUrl: async (
        req: Request<{}, {}, UrlDTO>,
        res: Response
    ) => {
        try {
            const shortUrls = await prisma.shortUrl.findMany({});
            const response: ShortUrlResponseDTO = {
                shortUrl: shortUrls,
            };
            res.status(201).json(response);
        } catch (error: any) {
            console.error('Error while creating short URL:', error);
            res.status(400).json({ message: "Error", error: error.message });
        }
    },
};


export default UrlController;
