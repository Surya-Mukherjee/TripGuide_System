class apiResponse{
    constructor(statusCode,data,message="successfull"){
        this.statusCode=statusCode,
        this.data=data
        this.message=message
        this.statusCode<400
    }
}

export { apiResponse }