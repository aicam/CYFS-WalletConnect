import { RouterArray } from '../types';
import { publishProjectRouter } from './publish_project';
import { ROUTER_PATHS } from '@src/common/routers';
import {retrieveProjectRouter} from "../../service/routers/retrieve_project";

export const routers: RouterArray = [
    {
        reqPath: ROUTER_PATHS.PUBLISH_PROJECT, // test api
        router: publishProjectRouter
    },
    {
        reqPath: ROUTER_PATHS.RETRIEVE_PROJECT,
        router: retrieveProjectRouter
    }
];
