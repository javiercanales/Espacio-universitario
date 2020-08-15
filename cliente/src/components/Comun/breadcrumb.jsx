import React from 'react'


const BreadCrumb=(items)=>{
    var it=Object.values(items)[0]
    return(
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            
            { 
            it.map((item,i)=>{
                if(i>=(it.length-1)){
                   return(    
                        <li className="breadcrumb-item active link"  aria-current="page" key={item} href="#">{item}</li>
                    )
                }                
                else{
                    return(
                    <li className="breadcrumb-item link" key={item}>{item}</li>
                    )
                }
               
            
                
                    
                

            
                
            }
            )

            }

            
                           
            
             
        </ol>
        </nav>
    )


}

export default BreadCrumb
