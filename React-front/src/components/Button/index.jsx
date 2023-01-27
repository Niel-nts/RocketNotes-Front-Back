import { Container } from "./styles";

export function Button({title, loading=false, onPress}){
    return(
        <Container type="button" disabled={loading} onClick={onPress}>
        {loading ? 'Carregando...' : title}
        </Container>
    )
}