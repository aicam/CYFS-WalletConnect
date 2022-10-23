// Start the initialization entry
import * as cyfs from 'cyfs-sdk';
import { DEC_ID, APP_NAME } from '../common/constant';
import {
    waitStackRuntime,
    useSimulator,
    SimulatorZoneNo,
    SimulatorDeviceNo
} from '../common/cyfs_helper/stack_wraper';
import * as MetaClient from '../common/cyfs_helper/meta_client';

export async function init() {
    // zoneNo: FIRST -> simulator1, SECOND -> simulator2, REAL -> production environment
    // deviceNo: Just use the default SimulatorDeviceNo.FIRST
    useSimulator(SimulatorZoneNo.FIRST, SimulatorDeviceNo.FIRST);
    // MetaClient choose "nightly"
    MetaClient.init(MetaClient.EnvTarget.BETA);
    await waitStackRuntime(DEC_ID);
}
//
// export let stack: cyfs.SharedCyfsStack;
//
// export async function init() {
//     const service_http_port = 21000;
//     const ws_port = 21001;
//     const decId = cyfs.ObjectId.from_base_58('9tGpLNnATnZTBkPxVP7TK526dz4KgjHZxkHYnR2WT4E9').unwrap();
//     const param = cyfs.SharedCyfsStackParam.new_with_ws_event_ports(service_http_port, ws_port, decId);
//     if (param.err) {
//         console.error(`init SharedCyfsStackParam failed, ${param}`);
//         return;
//     }
//     stack = cyfs.SharedCyfsStack.open(param.unwrap());
//     while (true) {
//         // @ts-ignore
//         const r = await stack.wait_online(cyfs.Some(cyfs.JSBI.BigInt(100000)));
//         if (r.err) {
//             console.error(`wait online error: ${r.val}`);
//         } else {
//             console.log('online success.');
//             break;
//         }
//     }
//
// }
