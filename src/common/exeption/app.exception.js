export function ConflictException({errMsg = "Confilct" , cause = {statusCode : 409}}){
    throw new Error(errMsg , cause)
}

export function NotFoundException({errMsg = "not found" , cause = {statusCode : 404}}){
    throw new Error(errMsg , cause)
}