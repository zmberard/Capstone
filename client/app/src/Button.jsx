const Button1 = () => {
    
    const clickMe = () => {
        alert("clicked");
    }
    
    return (
        <Button1 onClick={clickMe}> 
            Click me
        </Button1>
    );
}

export default Button1