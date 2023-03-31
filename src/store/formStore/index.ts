import { createModel } from "@rematch/core";
import { RootModel } from "..";
import { DataType, IField, IForm } from "../../types/Form";
import {
  LocalStorageKey,
  getLocalStorage,
  setLocalStorage,
} from "../../helpers/localStorage";

export interface FormStoreState {
  formList: IForm[];
  currentForm: IForm | undefined;
}

const formStore = createModel<RootModel>()({
  state: {
    currentForm: {
      name: "",
      description: "",
      createdAt: "",
      fields: [],
    },
    formList: [],
  } as FormStoreState,

  reducers: {
    setFormList(state, payload: IForm[]) {
      return { ...state, formList: payload };
    },

    setCurrentForm(state, payload: Partial<IForm>) {
      return { ...state, currentForm: { ...state.currentForm!, ...payload } };
    },
    setFieldToCurrentForm(state, payload: IField) {
      return {
        ...state,
        currentForm: {
          ...state.currentForm!,
          fields: [...state.currentForm?.fields!, payload],
        },
      };
    },
    clearCurrentForm(state) {
      return {
        ...state,
        currentForm: { name: "", description: "", createdAt: "", fields: [] },
      };
    },
    addNewField(state) {
      return {
        ...state,
        currentForm: {
          ...state.currentForm!,
          fields: [
            ...state.currentForm?.fields!,
            { dataType: DataType.STRING, name: "", required: false },
          ],
        },
      };
    },
    updateFieldByName(state, payload: { id: number; field: Partial<IField> }) {
      const { id, field } = payload;
      const newField = state.currentForm?.fields!;

      newField[id] = { ...newField[id], ...field };

      return {
        ...state,
        currentForm: {
          ...state.currentForm!,
          fields: newField,
        },
      };
    },
    deleteFieldByIds(state, payload: number) {
      const newField = state.currentForm?.fields!;
      const index = payload;
      if (index > -1) {
        // only splice array when item is found
        newField.splice(index, 1); // 2nd parameter means remove one item only
      }
      return {
        ...state,
        currentForm: {
          ...state.currentForm!,
          fields: newField,
        },
      };
    },
  },
  effects: (dispatch) => ({
    async saveForm(payload: IForm, state) {
      const newForm: IForm[] = [
        ...state.formStore.formList,
        {
          ...payload,
          createdAt: new Date().toLocaleDateString().replaceAll(".", "-"),
        },
      ];
      localStorage.setItem("formList", JSON.stringify(newForm));
      dispatch.formStore.setFormList(newForm);
    },
    async getForms() {
      const forms = getLocalStorage<IForm[]>(LocalStorageKey.formList) || [];
      dispatch.formStore.setFormList(forms);
    },
    async deleteForm(payload: string, state) {
      const newForms = state.formStore.formList.filter(
        (form) => form.name !== payload
      );
      setLocalStorage(LocalStorageKey.formList, newForms);
      dispatch.formStore.setFormList(newForms);
    },
  }),
});

export default formStore;
