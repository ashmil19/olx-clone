import { createContext, useEffect, useState } from "react";


export const PostContext = createContext(null)


function Post({children}){
    const [postDetails, setPostDetails] = useState(()=>{
        const storedValue = localStorage.getItem('postDetails')
        return storedValue ? JSON.parse(storedValue) : null
    });

    useEffect(()=>{
        localStorage.setItem('postDetails', JSON.stringify(postDetails))
    },[postDetails])

    return (
        <PostContext.Provider value={{postDetails, setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
} 

export default Post