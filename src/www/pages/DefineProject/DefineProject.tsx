import React, {useState} from "react";
import {walletInfo} from "@www/stores/wallet/types";
import {connect} from "react-redux";
import {ApplicationState} from "@www/stores";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Button, Col, Input, Row, Typography} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';

import './DefineProject.css';
import {listProjectsByPage, publishProject, retrieveProject} from "@www/apis/project";
import {sendToken} from "@www/smart_contracts/SendToken";

interface PropsFromState {
    wallet: walletInfo
}

const {Title, Paragraph, Text, Link} = Typography;

interface propsFromDispatch {
}

type Props = PropsFromState & propsFromDispatch;

const DefineProject: React.FC<Props> = ({wallet}) => {
    const [projectSubmitted, setProjectSubmitted] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectCo, setProjectCo] = useState("");
    const [projectVerraURL, setProjectVerraURL] = useState("");

    const hashFunc = (str: string): number => {
        // set variable hash as 0
        let hash = 0;
        // if the length of the string is 0, return 0
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let ch = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash;
        }
        return hash > 0 ? hash : -hash;
    }

    const submitProject = () => {
        const hash = hashFunc(projectVerraURL);
        console.log("ID of project ", hash);
        publishProject({
            id: hash,
            verraUrl: projectVerraURL,
            title: projectTitle,
            description: projectDescription,
            co: parseFloat(projectCo)
        });
        sendToken(wallet.walletAddress, projectCo.replace(".", ""));
        setProjectSubmitted(true);
    }

    return (
        <>
            <Row>
                <Col span='2'/>
                <Col span='12'>
                    <Text className='title-pre-format'>Dashboard / Define Project</Text>
                </Col>
                <Col span='6'/>
                <Col>
                    <Button>Marketplace</Button>
                </Col>
            </Row>
            <div className='form-title-div'>
                <Row>
                    <Col span='2'/>
                    <Col span='20'>
                        <Title>Project Information</Title>
                        <Text className='title-pre-format'>You need to register your project in Verra or Gold Standard
                            to provide
                            the registration link in project definition. In order to prevent double-counting in
                            Carbon credits, we need to assess your information, in this regard, projects
                            submitted will take 5-7 days to be added to marketplace.</Text>
                    </Col>
                    <Col span='2'/>
                </Row>
                {!projectSubmitted &&
                    <div>
                        <Row className='form-title-div'>
                            <Col span='2'/>
                            <Col span='10' className='field-margin'>
                                <Button onClick={() => listProjectsByPage(0)}>Hello fuck</Button>
                                <Button onClick={() => retrieveProject(116660)}>Bitch</Button>
                                <Text>Project Title</Text>
                                <Input onChange={(e) => {
                                    setProjectTitle(e.target.value);
                                }} size="large" placeholder="For ex. Africa Forestation"
                                       prefix={<CheckCircleOutlined/>}/>
                            </Col>
                            <Col span='10' className='field-margin'>
                                <Text>Verra URL</Text>
                                <Input size="large"
                                       onChange={(e) => {
                                           setProjectVerraURL(e.target.value);
                                       }}
                                       placeholder="For ex. https://registry.verra.org/app/projectDetail/VCS/2899"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='2'/>
                            <Col span='10' className='field-margin'>
                                <Text>Description</Text>
                                <Input.TextArea onChange={(e) => {
                                    setProjectDescription(e.target.value);
                                }} rows={4}/>
                            </Col>
                            <Col span='10' className='field-margin'>
                                <Text>Amount of Carbon removal (by Ton)</Text>
                                <Input
                                    onChange={(e) => {
                                        setProjectCo(e.target.value);
                                    }}
                                    size="large" placeholder="For ex. 4.3"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='2'/>
                            <Col className='field-margin'>
                                <Button onClick={submitProject}>Submit Project</Button>
                            </Col>
                        </Row>
                    </div>}
                {projectSubmitted &&
                    <Row>
                        <Col span='2'/>
                        <Col span='20'>
                            <Title>Thanks for your submission.</Title>
                            <Title>GCT tokens are sent to your wallet. Now you can sell them as a
                                cryptocurrency asset.</Title>
                        </Col>
                        <Col span='2' />
                    </Row>
                }
            </div>
        </>
    )
}

const mapStateToProps = ({wallet}: ApplicationState) => ({
    wallet: wallet
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(DefineProject);