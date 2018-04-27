export const DO_SOMETHING_TOKEN = "DO_SOMETHING";

export type DoSomethingPayload = void;

export interface IDoSomething {
    type: typeof DO_SOMETHING_TOKEN;
    payload: DoSomethingPayload;
}

export const createAction = (payload: DoSomethingPayload): IDoSomething => ({
    payload,
    type: DO_SOMETHING_TOKEN as typeof DO_SOMETHING_TOKEN,
});
