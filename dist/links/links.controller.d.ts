import { Response } from 'express';
import { LinksService } from './links.service';
export declare class LinksController {
    private linksService;
    constructor(linksService: LinksService);
    redirectUrl(shortId: string, res: Response): Promise<void>;
}
