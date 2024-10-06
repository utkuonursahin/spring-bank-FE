export type GenericResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
};
