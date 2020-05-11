import React, { Component, Fragment } from 'react';
import '../pages/style/CrearUsuarios.css';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../mutations/index';

class crearUsuarios extends Component {
	state = {
		form: {
			nombre: '',
			apellido: '',
			empresa: '',
			edad: '',
			email: '',
			tipo: 'Unam'
		},
		error: false,
		emails: []
	};

	//funciones
	nuevoCampo = () => {
		// console.log('haz hecho click');
		this.setState({
			emails: this.state.emails.concat([ { email: '' } ])
		});
	};

	quitarCampo = (i) => () => {
		// console.log(`presionaste el eliminar ${i}`);
		this.setState({
			emails: this.state.emails.filter((email, index) => i !== index)
		});
	};

	leerCampo = (i) => (e) => {
		// console.log(i);
		// console.log(e.target.value);
		const nuevoEmail = this.state.emails.map((email, index) => {
			if (i !== index) return email;
			return {
				...email,
				email: e.target.value
			};
		});
		this.setState({
			emails: nuevoEmail
		});
	};

	render() {
		const { error } = this.state;
		let respuesta = error ? (
			<p className="alert alert-danger p-3 text-center"> Todos los campos Son Obligatorios</p>
		) : (
			''
		);
		return (
			<Fragment>
				<h1> Web Development Services </h1>
				{respuesta}
				<Mutation mutation={NUEVO_USUARIO} onCompleted={() => this.props.history.push('/muestra')}>
					{(crearUsuario) => (
						<form
							//crearCliente (schema.graphql) es una funcion
							//que recibe un INPUT (los de aqui) segun ciertos requerimentos de ClienteInput(shcema.grapqhph)
							// y devuelve un cliente
							className="col-8"
							onSubmit={(e) => {
								e.preventDefault();
								const { nombre, apellido, edad, empresa, tipo } = this.state.form;
								// recordemos que los email ahora los leeremos del state no del form.
								const { emails } = this.state;

								// validar el error =  this.state.error
								if (
									nombre === '' ||
									apellido === '' ||
									emails === '' ||
									empresa === '' ||
									tipo === '' ||
									edad === ''
								) {
									this.setState({
										error: true
									});
									return;
								}
								// cuando la validacion del form es correcta segun validacion cambia estado
								this.setState({
									error: false
								});

								const input = {
									nombre,
									apellido,
									empresa: empresa,
									edad: Number(edad),
									emails,
									tipo
								};
								// console.log(input);
								crearUsuario({
									variables: { input }
								});
							}}
						>
							<div className="form-group">
								<label> Nombre </label>
								<input
									className="form-control"
									type="text"
									autoComplete="off"
									name="nombre"
									onChange={(e) => {
										this.setState({
											form: {
												...this.state.form,
												nombre: e.target.value
											}
										});
									}}

									// value lo convierte de no controlados a controlados
								/>
							</div>

							<div className="form-group">
								<label> Apellidos </label>
								<input
									className="form-control"
									type="text"
									autoComplete="off"
									name="apellido"
									onChange={(e) => {
										this.setState({
											form: {
												...this.state.form,
												apellido: e.target.value
											}
										});
									}}
								/>
							</div>

							{this.state.emails.map((input, index) => (
								<div key={index} className="form-group col-md-12">
									<label> Correo {index + 1} : </label>
									<div className="input-group">
										<input
											onChange={this.leerCampo(index)}
											type="email"
											placeholder="Email"
											className="form-control"
										/>
										<div className="input-group-append">
											<button
												type="button"
												onClick={this.quitarCampo(index)}
												className="btn btn-danger"
											>
												&times; Eliminar
											</button>
										</div>
									</div>
								</div>
							))}

							<div className="form-group d-flex justify-content-center col-md-12">
								<button onClick={this.nuevoCampo} type="button" className="btn btn-warning">
									{' '}
									+ Agregar Email
								</button>
							</div>

							<div className="form-group">
								<label> Empresa </label>
								<input
									className="form-control"
									type="text"
									autoComplete="off"
									name="empresa"
									onChange={(e) => {
										this.setState({
											form: {
												...this.state.form,
												empresa: e.target.value
											}
										});
									}}
								/>
							</div>
							<div className="form-group">
								<label> Edad</label>
								<input
									className="form-control"
									type="number"
									autoComplete="off"
									name="edad"
									onChange={(e) => {
										this.setState({
											form: {
												...this.state.form,
												edad: e.target.value
											}
										});
									}}
								/>
							</div>
							<div className="form-group">
								<label> tipo </label>
								<select
									className="form-control"
									type="text"
									name="tipo"
									onChange={(e) => {
										this.setState({
											form: {
												...this.state.form,
												tipo: e.target.value
											}
										});
									}}
								>
									<option value="Unam"> Unam</option>
									<option value="Externo"> Externo</option>
									<option value="Otro">Otro </option>
								</select>
							</div>
							<button type="submit" className="btn btn-primary" onClick={this.handleClick}>
								{' '}
								Agregar Usuario
							</button>
						</form>
					)}
				</Mutation>
			</Fragment>
		);
	}
}

export default crearUsuarios;
