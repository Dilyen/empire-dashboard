  
export class Turntabl_Project {
    project_id?: number
    project_name: string
    
}

export class Endpoints{
    endpoint_id?: number
    project_id?: number
    endpoint_url: string
    request_method?: string
    
}

export class Status{
    project_id: number
    endpoint_url: string
    status: number
    endpoint_id: number
    request_method: string
    project_name: string
    time:string
}

export class RequestInput {
    project_name: string
    request_method:string
    urls: Endpoints[]

}
export class AddInput{
    request_method:string
    urls: Endpoints[]
    endpoint_url: string
    project_id?: number
    


}