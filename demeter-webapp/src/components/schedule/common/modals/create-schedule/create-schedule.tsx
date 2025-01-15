import dayjs from "dayjs";
import {useState} from "react";
import {Button, Flex, Form, Input, Select} from "antd";
import {FullDraggableModal} from "full-flex-ui";
import {useFormDateFieldRules} from "@D/core/hooks/form/form-field/use-form-date-filed-rules.tsx";
import {useScheduleStatus} from "@D/components/schedule/common/hooks/use-schedule-status.tsx";
import {useCreateSchedule} from "@D/components/schedule/common/hooks/use-create-schedule.tsx";
import {useDemeterDispatch, useDemeterSelector} from "@D/core/store/demeter-hook.ts";
import {setCreateScheduleModalVisible} from "@D/core/store/features/schedule-slice.ts";

export const CreateSchedule = () => {
    const {TextArea} = Input;
    const [form] = Form.useForm();
    const dispatch = useDemeterDispatch();
    const {createScheduleHolderMessage, addSchedule} = useCreateSchedule();
    const [scheduleName, setScheduleName] = useState<string>("New Schedule");
    const createScheduleModalVisible = useDemeterSelector(state => state.scheduleStore.createScheduleModalVisible);
    return (
        <FullDraggableModal classNames={{content: "create-schedule-draggable-modal"}}
                            title={<div>
                                <div>Add schedule</div>
                                <Flex justify={"center"}>
                                    <Button style={{
                                        color: "white",
                                        width: 80,
                                        height: 80,
                                        fontSize: 50,
                                        borderRadius: 20,
                                        backgroundColor: "#91003c"
                                    }}>
                                        {scheduleName.at(0)}
                                    </Button>
                                </Flex>
                            </div>}
                            style={{top: 80}}
                            open={createScheduleModalVisible}
                            closable={true}
                            onCancel={() => dispatch(setCreateScheduleModalVisible(false))}
                            maskClosable={false}
                            cancelText={"Cancel"}
                            okText={"Add schedule"}
                            onOk={() => form.submit()}>
            {createScheduleHolderMessage}
            <Form name={"create-schedule"} layout={"vertical"} form={form} onFinish={addSchedule} initialValues={{
                "projectName": "New Schedule",
                "projectStatus": 3,
                "startDateTime": dayjs().format("YYYY-MM-DD")
            }}>
                <Form.Item layout={"vertical"} label="Schedule name" name="projectName" rules={[{required: true}]}>
                    <Input onChange={e => setScheduleName(e.target.value)}/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule status" name="projectStatus" rules={[{required: true}]}>
                    <Select showSearch options={useScheduleStatus()} filterOption={(input, option) => {
                        return (option?.label?.toString() ?? "").toLowerCase().includes(input.toLowerCase());
                    }}/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule startDate" name="startDateTime"
                           rules={useFormDateFieldRules(true)}>
                    <Input/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule endDate" name="endDateTime"
                           rules={useFormDateFieldRules(false)}>
                    <Input/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule description" name="description"
                           rules={[{required: false}]}>
                    <TextArea placeholder="Autosize height with minimum and maximum number of lines"
                              autoSize={{minRows: 3, maxRows: 10}}/>
                </Form.Item>
            </Form>
        </FullDraggableModal>
    )
}