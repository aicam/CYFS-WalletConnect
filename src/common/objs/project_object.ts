// import * as cyfs from 'cyfs-sdk';
// import { AppObjectType } from '../types';
// import * as protos from './obj_proto_pb';
//
// export const PROJECT_OBJECT_TYPE = AppObjectType.PROJECT;
//
// export class ProjectDescTypeInfo extends cyfs.DescTypeInfo {
//     public obj_type(): number {
//         return PROJECT_OBJECT_TYPE;
//     }
//
//     public sub_desc_type(): cyfs.SubDescType {
//         // default
//         return {
//             owner_type: 'option',
//             area_type: 'option',
//             author_type: 'option',
//             key_type: 'disable'
//         };
//     }
// }
//
// const PROJECT_DESC_TYPE_INFO = new ProjectDescTypeInfo();
//
// export class ProjectDescContent extends cyfs.ProtobufDescContent {
//     private m_id: number;
//     private m_title: string;
//     private m_description: string;
//     private m_verraURL: string;
//     private m_co2: number;
//
//     public constructor(param: {
//         m_id: number,
//         m_title:string,
//         m_description: string,
//         m_verraURL: string,
//         m_co2: number
//     }) {
//         super();
//         this.m_id = param.m_id;
//         this.m_title = param.m_title;
//         this.m_description = param.m_description;
//         this.m_verraURL = param.m_verraURL;
//         this.m_co2 = param.m_co2;
//     }
//
//     public type_info(): cyfs.DescTypeInfo {
//         return PROJECT_DESC_TYPE_INFO;
//     }
//
//     public try_to_proto(): cyfs.BuckyResult<protos.Project> {
//         const target = new protos.Project();
//         target.setId(this.m_id);
//         target.setTitle(this.m_title);
//         target.setVerraurl(this.m_verraURL);
//         target.setDescription(this.m_description);
//         target.setCo2(this.m_co2);
//         return cyfs.Ok(target);
//     }
//
//     public get id(): number {
//         return this.m_id;
//     }
//
//     public get description(): string {
//         return this.m_description;
//     }
//
//     public get title(): string {
//         return this.m_title;
//     }
//
//     public get co2(): number {
//         return this.m_co2;
//     }
//
//     public get verraUrl(): string {
//         return this.m_verraURL;
//     }
// }
//
// export class ProjectDescContentDecoder extends cyfs.ProtobufDescContentDecoder<
//     ProjectDescContent,
//     protos.Project
//     > {
//     public constructor() {
//         super(protos.Project.deserializeBinary);
//     }
//
//     public type_info(): cyfs.DescTypeInfo {
//         return PROJECT_DESC_TYPE_INFO;
//     }
//
//     public try_from_proto(projectObject: protos.Project): cyfs.BuckyResult<ProjectDescContent> {
//         const id = projectObject.getId();
//         const content = projectObject.getContent();
//
//         return cyfs.Ok(new ProjectDescContent({ key, content }));
//     }
// }