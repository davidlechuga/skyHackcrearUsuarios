import gql from 'graphql-tag';

export const NUEVO_USUARIO = gql`
	mutation crearUsuario($input: UsuarioInput) {
		crearUsuario(input: $input) {
			id
			nombre
			apellido
		}
	}
`;
