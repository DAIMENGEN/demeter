import "./login-page.scss";
import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, Layout, Space} from "antd";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import login_bg_image from "../../assets/images/jpeg/login-bg-image.jpeg";
import login_logo_wr_image from "../../assets/images/jpg/login_logo_wr.jpg";
import {EmployeeService} from "@D/http/service/employee-service";
import {setEmployeeIdAction, setEmployeeNameAction} from "@D/core/store/features/employee-slice";

export const LoginPage: React.FC = () => {
    const {Content} = Layout;
    const navigate = useNavigate();
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const onFinish = useCallback((values: { account: string, password: string }) => {
        const employeeService = new EmployeeService();
        employeeService.loginRequest(
            values.account,
            values.password,
            (token: string) => {
                success("Login Successfully").then(() => {
                    localStorage.setItem("token", token);
                    employeeService.getCurrentEmployeeIdRequest(
                        (employeeId: string) => dispatch(setEmployeeIdAction(employeeId)),
                        (error: Error) => console.error(error)
                    );
                    employeeService.getCurrentEmployeeNameRequest(
                        (username: string) => dispatch(setEmployeeNameAction(username)),
                        (error: Error) => console.error(error)
                    );
                    navigate("/home-page");
                });
            },
            (error: Error) => {
                failure(error.message).then();
            }
        );
    }, [dispatch, navigate, success, failure]);

    return (
        <Layout className={"login-page"} style={{
            backgroundImage: `url(${login_bg_image})`,
            backgroundSize: "cover",
            backgroundPositionX: "44%",
            backgroundAttachment: "fixed"
        }}>
            <Content className={"login-content"}>
                <div className={"login-form"}>
                    {contextHolderMessage}
                    <div className="logo-container">
                        <img src={login_logo_wr_image} alt="Advantest"/>
                    </div>
                    <h1 className="login-title">Welcome to Demeter</h1>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="account"
                            rules={[{required: true, message: 'Please enter your username!'}]}
                        >
                            <Input placeholder={"You Username"} autoComplete="username"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please enter your password!'}]}
                        >
                            <Input.Password placeholder={"You Password"} autoComplete="current-password"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{textAlign: "center", width: "100%"}}>
                        <Space>
                            <span style={{color: "#a7a5a5"}}>Don't have an account yet?</span>
                            <a href="https://www.advantest.com/" onClick={() => {
                                alert("敬请期待")
                            }}>Sign up</a>
                        </Space>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}