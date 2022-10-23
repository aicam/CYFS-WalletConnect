import * as cyfs from 'cyfs-sdk';
import {projectRouter} from './project';

type postRouter = (req: cyfs.RouterHandlerPostObjectRequest) => Promise<cyfs.BuckyResult<cyfs.RouterHandlerPostObjectResult>>

class PostRouterReqPathRouterHandler implements cyfs.RouterHandlerPostObjectRoutine {
    private m_router: postRouter;
    public constructor(router: postRouter) {
        this.m_router = router;
    }

    public call(param: cyfs.RouterHandlerPostObjectRequest): Promise<cyfs.BuckyResult<cyfs.RouterHandlerPostObjectResult>> {
        return this.m_router(param);
    }
}

export async function main() {
    const service_http_port = 21000;
    const ws_port = 21001;
    const decId = cyfs.ObjectId.from_base_58('9tGpLNnATnZTBkPxVP7TK526dz4KgjHZxkHYnR2WT4E9').unwrap();
    const param = cyfs.SharedCyfsStackParam.new_with_ws_event_ports(service_http_port, ws_port, decId);
    if (param.err) {
        console.error(`init SharedCyfsStackParam failed, ${param}`)
    }
    const stack = cyfs.SharedCyfsStack.open(param.unwrap());
    while (true) {
        const r = await stack.wait_online(cyfs.JSBI.BigInt(100000));
        if (r.err) {
            console.error('wait online error, ', r);
        } else {
            console.log('Online success!')
            break
        }
    }
    const access = new cyfs.AccessString(0);
    access.set_group_permissions(cyfs.AccessGroup.CurrentZone, cyfs.AccessPermissions.WirteAndCall);
    access.set_group_permissions(cyfs.AccessGroup.CurrentDevice, cyfs.AccessPermissions.WirteAndCall);
    access.set_group_permissions(cyfs.AccessGroup.OwnerDec, cyfs.AccessPermissions.WirteAndCall);
    const ra = await stack.root_state_meta_stub().add_access(cyfs.GlobalStatePathAccessItem.new('/test/hello', access));
    if (ra.err) {
        console.error(`path /test/hello add access failed, ${ra}`);
        return;
    }
    console.log('add access success!');
    const r = await stack.router_handlers().add_post_object_handler(
        cyfs.RouterHandlerChain.Handler,
        'hello-world',
        1,
        undefined,
        '/test/hello',
        cyfs.RouterHandlerAction.Pass,
        new PostRouterReqPathRouterHandler(projectRouter)
    );
    if (r.err) {
        console.error(`add post handler failed, ${r}`);
    } else {
        console.log('add post handler success!')
    }
}

main();