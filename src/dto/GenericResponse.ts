export type GenericResponse<T> = {
    statusCode: number;
    data: T;
    error?: any;
};
