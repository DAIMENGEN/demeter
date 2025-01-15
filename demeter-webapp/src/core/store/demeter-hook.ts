import {DemeterDispatch, DemeterState} from "./demeter-store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useDemeterSelector: TypedUseSelectorHook<DemeterState> = useSelector;
export const useDemeterDispatch = () => useDispatch<DemeterDispatch>();
