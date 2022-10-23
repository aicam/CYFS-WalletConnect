import { checkStack } from '@src/common/cyfs_helper/stack_wraper';
import * as cyfs from 'cyfs-sdk';
import {generateUniqueKey} from "../utils/common";
import {Project, ProjectDecoder} from "@src/common/objs/project";
import {DEC_ID} from "@src/common/constant";
import {ROUTER_PATHS} from "@src/common/routers";
import {ResponseObjectDecoder} from "@src/common/objs/responseobject";

// publish a project
export async function publishProject(projectInfo: {id: number, title: string, description: string, verraUrl: string, co: number}) {
    const stackWraper = checkStack();
    // Create a new Message object
    const projectObj = Project.create({
        id: projectInfo.id,
        title: projectInfo.title,
        description: projectInfo.description,
        verraURL: projectInfo.verraUrl,
        co: projectInfo.co,
        owner: stackWraper.checkOwner(),
        decId: DEC_ID
    });
    // make a request
    const ret = await stackWraper.postObject(projectObj, ResponseObjectDecoder, {
        reqPath: ROUTER_PATHS.PUBLISH_PROJECT,
        decId: DEC_ID
    });
    if (ret.err) {
        console.error(`reponse err, ${ret}`);
        return null;
    }
    // Parse out the ResponseObject object
    const r = ret.unwrap();
    if (r) {
        const retObj = {
            err: r.err,
            msg: r.msg
        };
        console.log(`reponsea, ${retObj.msg}`);
        return JSON.stringify(retObj);
    }
}

// retrieve project
export async function retrieveProject(id: number) {
    const stackWraper = checkStack();
    // Create a new Message object
    const messageObj = Project.create({
        id: id,
        title: '',
        description: '',
        verraURL: '',
        co: 0,
        decId: DEC_ID,
        owner: stackWraper.checkOwner()
    });
    // make a request
    const ret = await stackWraper.postObject(messageObj, ProjectDecoder, {
        reqPath: ROUTER_PATHS.RETRIEVE_PROJECT,
        decId: DEC_ID
    });
    if (ret.err) {
        console.error(`reponse err, ${ret}`);
        return null;
    }
    // Parse out the MessageObject object
    const msgRawObj = ret.unwrap();
    console.log("Done and returned ", msgRawObj?.title);
    if (msgRawObj) {
        const msgObj = {
            id: msgRawObj.id,
            title: msgRawObj.title
        };
        return msgObj;
    }
    return null;
}