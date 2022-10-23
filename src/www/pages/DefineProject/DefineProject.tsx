import React from "react";
import {walletInfo} from "@www/stores/wallet/types";
import {connect} from "react-redux";
import {ApplicationState} from "@www/stores";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Col, Row, Typography} from 'antd';

interface PropsFromState {
    wallet: walletInfo
}

const {Title, Paragraph, Text, Link} = Typography;

interface propsFromDispatch {
}

type Props = PropsFromState & propsFromDispatch;

const DefineProject: React.FC<Props> = ({wallet}) => {
    return (
        <Row>
            <Col span='8'>
                <Title>Dashboard</Title>
            </Col>
        </Row>
    )
}

const mapStateToProps = ({wallet}: ApplicationState) => ({
    wallet: wallet
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(DefineProject);