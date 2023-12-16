import '../styles/back-outline-button.css'

const OutlineButton=({name,color='red',handlerFunction})=>{
    
    return(
        <button 
            id="outline-button" 
            style={{color:color,border:`1px solid ${color}`}}
            onClick={()=>handlerFunction()}
        >
            {name}
        </button>
    )
}

export default OutlineButton;