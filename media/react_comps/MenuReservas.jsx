'use strict'

class MenuReservas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fechas_seleccionadas: [],
            habitacionesDisponibles: []
        };
    }

    // Pide habitaciones disponibles para la gente dada en los días dados
    // Usa GET hacia la api
    queryHabitaciones() {
        // Escape si no hay fechas seleccionadas
        if (this.state.fechas_seleccionadas == false) {
            this.setState({habitacionesDisponibles: []});
            alert("No ha seleccionado fechas");
            return;
        }

        fetch(`api/habitaciones/listar-habitaciones-filtro`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num_adults: this.state.adultos_num,
                num_children: this.state.ninos_num,
                fechas: this.state.fechas_seleccionadas
            })
        })
        .then(datos => datos.json())
        .then(datos => {
            console.log(datos);
            this.setState({
                habitacionesDisponibles: datos
            })
        });
    }

    render() {
        return <React.Fragment>
            <ContadorPersonas setParentState={args => this.setState(args)} />
            <Calendario
                setParentState={args => this.setState(args)}
                fechas_seleccionadas={this.state.fechas_seleccionadas}
            />
            <button onClick={() => this.queryHabitaciones()}>Buscar</button>

            <DisplayHabitaciones lista_hab={this.state.habitacionesDisponibles} />
        </React.Fragment>
    }
}



const domContainer = document.querySelector("#seccion_dinamica");
ReactDOM.render(React.createElement(MenuReservas), domContainer);