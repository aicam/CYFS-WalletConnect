
        // ObjectName: Project
        import * as cyfs from 'cyfs-sdk';
        import { AppObjectType } from './types';
        import * as protos from './obj_proto_pb';
        // The first 16 bits of type are reserved by the system, and the type of the applied object should be greater than 32767
        export const PROJECT_OBJECT_TYPE = AppObjectType.PROJECT;
        export class ProjectDescTypeInfo extends cyfs.DescTypeInfo {
            public obj_type(): number {
                return PROJECT_OBJECT_TYPE;
            }
        
            public sub_desc_type(): cyfs.SubDescType {
                // default
                return {
                    owner_type: 'option',
                    area_type: 'option',
                    author_type: 'option',
                    key_type: 'disable'
                };
            }
        }
        const PROJECT_DESC_TYPE_INFO = new ProjectDescTypeInfo();
        export class ProjectDescContent extends cyfs.ProtobufDescContent {
            private m_id: number;private m_title: string;private m_description: string;private m_verraURL: string;private m_co: number;
        
            public constructor(param: { id: number;title: string;description: string;verraURL: string;co: number; }) {
                super();
                this.m_id = param.id;this.m_title = param.title;this.m_description = param.description;this.m_verraURL = param.verraURL;this.m_co = param.co;
            }
        
            public type_info(): cyfs.DescTypeInfo {
                return PROJECT_DESC_TYPE_INFO;
            }
        
            public try_to_proto(): cyfs.BuckyResult<protos.Project> {
                const target = new protos.Project();
                target.setId(this.m_id);target.setTitle(this.m_title);target.setDescription(this.m_description);target.setVerraurl(this.m_verraURL);target.setCo(this.m_co);
                return cyfs.Ok(target);
            }
        
            public get id(): number {
                                return this.m_id;
                            }public get title(): string {
                                return this.m_title;
                            }public get description(): string {
                                return this.m_description;
                            }public get verraURL(): string {
                                return this.m_verraURL;
                            }public get co(): number {
                                return this.m_co;
                            }
        }
        export class ProjectDescContentDecoder extends cyfs.ProtobufDescContentDecoder<ProjectDescContent,protos.Project> {
            public constructor() {
                super(protos.Project.deserializeBinary);
            }
        
            public type_info(): cyfs.DescTypeInfo {
                return PROJECT_DESC_TYPE_INFO;
            }
        
            public try_from_proto(obj: protos.Project): cyfs.BuckyResult<ProjectDescContent> {
                const id = obj.getId();const title = obj.getTitle();const description = obj.getDescription();const verraURL = obj.getVerraurl();const co = obj.getCo();
        
                return cyfs.Ok(new ProjectDescContent({ id,title,description,verraURL,co }));
            }
        }
        export class ProjectDesc extends cyfs.NamedObjectDesc<ProjectDescContent> {
            // default
        }
        export class ProjectDescDecoder extends cyfs.NamedObjectDescDecoder<ProjectDescContent> {
            // default
        }
        export class ProjectBodyContent extends cyfs.ProtobufBodyContent {
            public try_to_proto(): cyfs.BuckyResult<protos.NoneObject> {
                return cyfs.Ok(new protos.NoneObject());
            }
        }
        export class ProjectBodyContentDecoder extends cyfs.ProtobufBodyContentDecoder<ProjectBodyContent, protos.NoneObject> {
            public constructor() {
                super(protos.NoneObject.deserializeBinary);
            }
        
            public try_from_proto(value: protos.NoneObject): cyfs.BuckyResult<ProjectBodyContent> {
                return cyfs.Ok(new ProjectBodyContent());
            }
        }
        export class ProjectId extends cyfs.NamedObjectId<ProjectDescContent, ProjectBodyContent> {
            public constructor(id: cyfs.ObjectId) {
                super(PROJECT_OBJECT_TYPE, id);
            }
            // default
        }
        export class ProjectIdDecoder extends cyfs.NamedObjectIdDecoder<ProjectDescContent, ProjectBodyContent> {
            public constructor() {
                super(PROJECT_OBJECT_TYPE);
            }
            // default
        }
        export class ProjectBuilder extends cyfs.NamedObjectBuilder<ProjectDescContent, ProjectBodyContent> {
            // default
        }
        export class Project extends cyfs.NamedObject<ProjectDescContent, ProjectBodyContent> {
            public static create(param: {
                id: number;title: string;description: string;verraURL: string;co: number;
                decId: cyfs.ObjectId;
                owner: cyfs.ObjectId;
            }): Project {
                const { id,title,description,verraURL,co } = param;
                const descContent = new ProjectDescContent({ id,title,description,verraURL,co });
                const bodyContent = new ProjectBodyContent();
                const builder = new ProjectBuilder(descContent, bodyContent);
                return builder.dec_id(param.decId).owner(param.owner).build(Project);
            }
        
            public get id(): number {
                                return this.desc().content().id;
                            }public get title(): string {
                                return this.desc().content().title;
                            }public get description(): string {
                                return this.desc().content().description;
                            }public get verraURL(): string {
                                return this.desc().content().verraURL;
                            }public get co(): number {
                                return this.desc().content().co;
                            }
        }
        export class ProjectDecoder extends cyfs.NamedObjectDecoder<ProjectDescContent, ProjectBodyContent, Project> {
            public constructor() {
                super(new ProjectDescContentDecoder(), new ProjectBodyContentDecoder(), Project);
            }
        }
        