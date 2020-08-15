import React from 'react'

const Carousel=({imagenes})=>{
    //console.log('imagenes recibidas',imagenes)
    
const url='http://146.83.198.35:1074/'
 

return(
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner h-50">
                {
                    imagenes && imagenes.filter(img=>(img!==null)).map((img,i)=>{
                        //console.log('foto',i)
                       console.log('actual',url.concat(img.slice(27,img.length)))
                        if(i==0){
                            return(
                                <div className="carousel-item active w-100" key={i}>
                                    <img src={url.concat(img.slice(27,img.length))} style={{height: "350px"}} className="img-fluid w-100" alt="..."/>
                                </div>
                            )
                        }
                         
                        else{
                            return(
                                <div className="carousel-item w-100" key={i}>
                                    <img src={url.concat(img.slice(27,img.length))} style={{height: "350px"}} className="img-fluid w-100" alt="..."/>
                                </div>
                            )
                        }
                        
                    })
                
                }
               
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Anterior</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Siguiente</span>
            </a>
        </div>
)


}

export default Carousel