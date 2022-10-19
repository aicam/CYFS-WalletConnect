import { ROUTER_PATHS } from '@src/common/routers';
import { HelloRequestObject } from '@src/common/objs/hello_request_object';
import { HelloResponseObjectDecoder } from '@src/common/objs/hello_response_object';
import { checkStack } from '@src/common/cyfs_helper/stack_wraper';
import * as cyfs from 'cyfs-sdk';
import {stack} from '../initialize';


// test/hello
export async function helloWorldSimple(name: string) {
    const stackWraper = checkStack();
    const helloObject = HelloRequestObject.create({
        name,
        decId: stackWraper.decId!,
        owner: stackWraper.checkOwner()
    });
    const ret = await stackWraper.postObject(helloObject, HelloResponseObjectDecoder, {
        reqPath: ROUTER_PATHS.TEST_HELLO,
        decId: stackWraper.decId,
        target: stackWraper.checkOwner()
    });
    if (ret.err) {
        console.error(`reponse err, ${ret}`);
        return null;
    }
    const helloResponseObject = ret.unwrap();
    console.log(`test api success, response: ${helloResponseObject?.greet}`);
    alert(helloResponseObject?.greet);
}

export async function helloWorld(name: string) {
    const decId = cyfs.ObjectId.from_base_58('9tGpLNnATnZTBkPxVP7TK526dz4KgjHZxkHYnR2WT4E9').unwrap();
    const owner = cyfs.ObjectId.from_base_58('5r4MYfFSMRLXSmzno9Ybh8s9MqoV2SEFJi4PbPWjHxNy').unwrap();
    const helloRequest = HelloRequestObject.create({
        name,
        decId,
        owner
    });
    const ret = await stack.non_service().post_object({
        common: {
            req_path: '/test/hello',
            dec_id: decId,
            level: cyfs.NONAPILevel.Router,
            flags: 0
        },
        object: new cyfs.NONObjectInfo(
            helloRequest.desc().object_id(),
            helloRequest.encode_to_buf().unwrap()
        )
    });
    if (ret.err) {
        console.error(`test api failed, ${ret}`);
        return ret;
    }
    const nonObject = ret.unwrap();
    const r = new HelloResponseObjectDecoder().from_raw(nonObject.object!.object_raw);
    if (r.err) {
        console.error(`decode response object failed, ${ret}`);
        return ret;
    }
    const helloResponseObject = r.unwrap();
    console.log('hello response: ', helloResponseObject?.greet);
    alert(helloResponseObject?.greet);
}