import React, {useEffect, useState} from "react";
import {listProjectsByPage} from "@www/apis/project";
import './Marketplace.css'
import {Col, Row, Typography} from "antd";
import {Project} from "@src/common/objs/project";

const {Title, Paragraph, Text, Link} = Typography;

export const Marketplace: React.FC = () => {
    const [marketData, setMarketData] = useState();

    useEffect(() => {
        listProjectsByPage(0).then(res => {
            // @ts-ignore
            setMarketData(res);
            console.log(res[2]?.verraURL);
        })
    }, []);

    return (
        <div className='div-container'>
            {
                marketData === undefined &&
                <div className="loader" />
            }
            {
                // @ts-ignore
                // eslint-disable-next-line array-callback-return
                marketData !== undefined && marketData.map((project: Project, i: React.Key | null | undefined) => {
                    if (project.description !== '')
                    return (
                        <div className='project-container' key={i}>
                            <Row>
                                <Col span='16'>
                                    <Title>{project.title}</Title>
                                    <Paragraph>{project.description}</Paragraph>
                                </Col>
                                <Col className='right-col' span='8'>
                                    <a className='verra-url' href={project.verraURL} target='_blank' key={i}>More information</a>
                                    <p className='co-title'>Total Carbon Removal</p>
                                    <p className='co-amount'>{project.co}</p>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }
        </div>
    )
}