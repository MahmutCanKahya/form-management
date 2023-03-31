import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import formStore from "./formStore";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface RootModel extends Models<RootModel> {
  formStore: typeof formStore;
}

type FullModel = ExtraModelsFromLoading<RootModel>;

export const models: RootModel = {
  formStore: formStore,
};

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin({})],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const useAppDispatch: () => Dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
