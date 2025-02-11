export class ClientError {
    constructor(private readonly message : string , private readonly path? : string[] ,  private readonly code?: string ) {
    }

}