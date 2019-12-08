
export class ErrorHandler {


    handleError(err: any): any {
        return this.formatError(err);
    }

    private formatError(err: any) {
        let error = Error(err);
        error =  {
            'message': error.message,
            'name': error.name,
            'stack': error.stack
        }
        return error;
    }

}