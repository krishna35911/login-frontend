import axios from "axios"

export const commonapi=async(httprequest,path,body,header)=>
{
    const reqconfig={
        method:httprequest,
        url:path,
        data:body,
        headers:header?header:{'Content-Type':'application/json'}
    }
    return await axios(reqconfig).then((result)=>
    {
        return result
    }).catch((err)=>
    {
        return err
    })
}