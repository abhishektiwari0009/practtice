let Card = ({userDetails}) => {
    console.log(userDetails);
    return(
        <>
            {
                userDetails.map((ele)=>{
                    return(
                        <>
                            <h1>{ele.name}</h1>
                            <p>{ele.age}</p>
                            <p>{ele.email}</p>
                            <p>{ele.city}</p>
                        </>
                    )
                })
            }
        </>
    )
}
export default Card