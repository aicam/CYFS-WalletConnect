import * as cyfs from 'cyfs-sdk';
import {HelloResponseObject} from '../common/objs/hello_response_object';
import {HelloRequestObjectDecoder} from "../common/objs/hello_request_object";
import {AppObjectType} from "../common/types";

export function helloWorldRouter(req: cyfs.RouterHandlerPostObjectRequest): Promise<cyfs.BuckyResult<cyfs.RouterHandlerPostObjectResult>> {
    const { object, object_raw } = req.request.object;
    if (!object || object.obj_type() !== AppObjectType.HELLO_REQUEST) {
        const msg = `obj_type error`;
        console.error(msg);
        return Promise.resolve(cyfs.Err(new cyfs.BuckyError(cyfs.BuckyErrorCode.InvalidParam, msg)));
    }
    const decoder = new HelloRequestObjectDecoder();
    const r = decoder.from_raw(object_raw);
    if (r.err) {
        const msg = `decode raw object failed, ${r}`;
        console.error(msg);
        return Promise.resolve(cyfs.Err(new cyfs.BuckyError(cyfs.BuckyErrorCode.InvalidParam, msg)));
    }
    const name = r.unwrap().name;
    const respObject = {
        greet: `Hello ${name}`,
        decId: cyfs.ObjectId.from_base_58('9tGpLNnATnZTBkPxVP7TK526dz4KgjHZxkHYnR2WT4E9').unwrap(),
        owner: cyfs.ObjectId.from_base_58('5r4MYfFSMRLXSmzno9Ybh8s9MqoV2SEFJi4PbPWjHxNy').unwrap()
    }
    const helloWorldResponseObject = HelloResponseObject.create(respObject);
    return Promise.resolve(
        cyfs.Ok({
            action: cyfs.RouterHandlerAction.Response,
            response: cyfs.Ok({
                object: new cyfs.NONObjectInfo(
                    helloWorldResponseObject.desc().object_id(),
                    helloWorldResponseObject.encode_to_buf().unwrap()
                )
            })
        })
    )
}