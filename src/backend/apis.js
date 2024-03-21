import { url } from "./URL"
import { commonapi } from "./commonfile"

export const registerapi=async(user)=>
{
    return await commonapi('POST',`${url}/register`,user,"")
}
export const loginapi=async(user)=>
{
    return await commonapi('POST',`${url}/login`,user,"")
}
export const adddetailsapi=async(body,header)=>
{
    return await commonapi("POST",`${url}/details`,body,header)
}

export const edituserprofileapi=async(body)=>
{
    return await commonapi('PUT',`${url}/user/edit`,body,"")
}
