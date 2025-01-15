import React from "react";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@D/page/login-page/login-page";
import {Authentication} from "@D/route/authentication";
import {HomePage} from "@D/page/home-page/home-page";
import {NavigationMenu} from "@D/components/navigation/navigation-menu/navigation-menu";
import {ScheduleHome} from "@D/components/schedule/schedule-home/schedule-home.tsx";
import {ScheduleMaintenance} from "@D/components/schedule/schedule-maintenance/schedule-maintenance";
import {Schedule} from "@D/components/schedule/schedule.tsx";

export const DemeterRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login-page" element={<LoginPage/>}/>
            <Route path="/home-page" element={<Authentication children={<HomePage/>}/>}>
                <Route index element={<NavigationMenu/>}/>
                <Route path="/home-page/schedule" element={<Schedule/>}>
                    <Route index element={<ScheduleHome/>}/>
                    <Route path="/home-page/schedule/maintenance/:projectId" element={<ScheduleMaintenance/>}/>
                </Route>
            </Route>
        </Routes>
    )
}