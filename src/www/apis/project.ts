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
    // if (msgRawObj) {
    //     const msgObj = {
    //         id: msgRawObj.id,
    //         title: msgRawObj.title
    //     };
    //     return msgObj;
    // }
    return msgRawObj;
}

// paging list messages under path /messages_list
export async function listProjectsByPage(pageIndex: number) {
    const stack = checkStack();
    // Get your own OwnerId
    // const target = to ? to : stack.checkOwner();
    const selfObjectId = stack.checkOwner();
    // Get an instance of cyfs.GlobalStateAccessStub
    const access = stack.check().root_state_access_stub(selfObjectId);
    // Use the list method to list all objects under messages_list
    const lr = await access.list('/projects_list', pageIndex, 10);

    if (lr.err) {
        if (lr.val.code !== cyfs.BuckyErrorCode.NotFound) {
            console.error(`list-subdirs in(messages_list) io failed, ${lr}`);
        } else {
            console.warn(`list-subdirs in(messages_list) not found, ${lr}`);
        }
        return [];
    }

    const list = lr.unwrap();
    const keyList = list.map((item) => item.map!.key);
    console.log('keyList: ', keyList);
    let allProjects = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < keyList.length; i++) {
        const msg = await retrieveProject(parseInt(keyList[i], 10));
        allProjects.push(msg);
    }
    // const retList = msgList.filter((msg) => msg !== null) as Project[];
    return allProjects;
}