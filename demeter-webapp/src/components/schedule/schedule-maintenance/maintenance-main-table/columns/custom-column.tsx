import {Button, Col, Drawer, Form, Input, InputNumber, Row, Space} from "antd";
import React, {useMemo, useState} from "react";
import {ProjectTaskService} from "@D/http/service/project-task-service.ts";
import {ProjectTaskAttributePayload} from "@D/http/payload/project-task-attribute-payload.ts";
import {SnowflakeIdUtil} from "@D/utils/snowflake-id-util.ts";
import {JsonObject} from "@D/global-types";
import {JsonUtils} from "@D/utils/json-utils.ts";
import {
    TableColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";

export const CustomColumn: React.FC<{
    projectId: string;
    createTableColumn: (tableColumn: TableColumn) => void;
}> = ({projectId, createTableColumn}) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState<boolean>();
    const projectTaskService = useMemo(() => ProjectTaskService.getInstance(), []);
    return (
        <div className={"custom-column"}>
            <Button onClick={() => setVisible(true)}>
                Text
            </Button>
            <Drawer classNames={{content: "create-custom-column-drawer"}}
                    title={"Create Custom Column"}
                    open={visible}
                    closable={true}
                    width={720}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    onClose={() => setVisible(false)}
                    maskClosable={false}
                    extra={
                        <Space>
                            <Button onClick={() => setVisible(false)}>Cancel</Button>
                            <Button onClick={() => form.submit()} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }>
                <Form form={form} layout={"vertical"} onFinish={(values: { title: string, order: number }) => {
                    const title = values.title;
                    const order = values.order;
                    const taskAttributeId = SnowflakeIdUtil.nextId().toString();
                    const taskAttributeProperties = JsonUtils.stringify({
                        title: title
                    });
                    const taskAttribute = new ProjectTaskAttributePayload(
                        taskAttributeId,
                        `attribute-name-${taskAttributeId}`,
                        "text",
                        taskAttributeProperties,
                        order
                    );
                    projectTaskService.createProjectTaskAttributeRequest(projectId, taskAttribute, () => {
                        const properties: JsonObject = JsonUtils.parse(taskAttribute.properties);
                        const title = (properties.title ?? taskAttribute.taskAttributeName) as string;
                        createTableColumn({
                            key: taskAttribute.id,
                            title: title,
                            dataIndex: taskAttribute.id,
                        });
                        setVisible(false);
                    });
                }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="title"
                                label="Name"
                                rules={[{required: true, message: "Please enter column title"}]}>
                                <Input placeholder="Please enter column title"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="order"
                                label="Order"
                                rules={[{required: true, message: "Please enter column order"}]}>
                                <InputNumber style={{width: "100%"}} placeholder="Please enter column order"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}