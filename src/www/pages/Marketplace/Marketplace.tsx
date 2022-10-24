import React, {useEffect, useState} from "react";
import {listProjectsByPage} from "@www/apis/project";
import './Marketplace.css'
import {Typography} from "antd";

const {Title, Paragraph, Text, Link} = Typography;

export const Marketplace: React.FC = () => {
    const [marketData, setMarketData] = useState();

    useEffect(() => {
        listProjectsByPage(0).then(res => {
            setMarketData(res);
            console.log(res[2]?.verraURL);
        })
    }, []);

    return (
        <div className='div-container'>
            {
                // @ts-ignore
                marketData !== undefined && marketData.map((project: { verraURL: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, i: React.Key | null | undefined) => {
                    return (
                        <Paragraph key={i}>{project.verraURL}</Paragraph>
                    )
                })
            }
        </div>
    )
}