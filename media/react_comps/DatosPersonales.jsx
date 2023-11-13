'use strict'

class DatosPersonales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellido: "",
            rut: "",
            email: "",
            telefono: ""
        };
    }

    render () {
        return <div className="datos-usuario">
            <span>Nombre:</span>
            <input onChange={e => this.setState({nombre: e.target.value})} />
            <span>Apellido:</span>
            <input onChange={e => this.setState({apellido: e.target.value})} />
            <span>RUT o Pasaporte:</span>
            <input onChange={e => this.setState({rut: e.target.value})} />
            <span>Email:</span>
            <input type="email" onChange={e => this.setState({email: e.target.value})} />
            <span>Teléfono:</span>
            <input type="number" onChange={e => this.setState({telefono: e.target.value})} />

            <div>
                <button
                    className="bonito"
                    onClick={() => this.props.func_confirmar(this.state)}
                >
                    Confirmar
                </button>
            </div>
        </div>
    }
}