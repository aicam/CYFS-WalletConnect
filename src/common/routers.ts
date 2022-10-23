import { Project } from "@src/common/objs/project";
import { ResponseObject} from "@src/common/objs/responseobject";

export const enum ROUTER_PATHS {
    PUBLISH_PROJECT = '/project/publish',
    RETRIEVE_PROJECT = '/project/retrive'
}

export type PublishProjecRequestParam = Project;
export type PublishProjectResponseParam = ResponseObject;

// /message/retrieve request and response params
export type RetrieveProjectRequestParam = Project;
export type RetrieveMessageResponseParam = Project;