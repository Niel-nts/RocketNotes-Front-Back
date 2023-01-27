import { Container } from "./Styles";

export function TextArea({ value, ...rest}){
    return(
        <Container {...rest}> 
            {value}
        </Container>
    )
}