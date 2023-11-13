'use strict'

class PasoRequerimientos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.enviarFechaElegida = this.enviarFechaElegida.bind(this);
        this.props.setParentState({
            fecha_inicio: this.getStringHoy(),
            fecha_fin: this.getStringHoy()
        });
    }

    // Fecha en formato string YYYY-mm-dd
    getStringHoy() {
        let ahora = new Date();
        return `${ahora.getFullYear()}-${ahora.getMonth()+1}-${ahora.getDate()}`;
    }

    cerrarCalendario() {
        this.setState({targetCalendario: undefined});
    }

    enviarFechaElegida(anno, mes, dia) {
        let nueva_fecha = new Date(anno, mes, dia);
        // targetCalendario establece que propiedad del state padre cambia
        let state = new Object();
        state[this.state.targetCalendario] = nueva_fecha;
        this.props.setParentState(state);
        this.cerrarCalendario();
    }

    render() {
        let stringHoy = this.getStringHoy();

        return <div className="paso-requisitos">
            <ContadorPersonas setParentState={this.props.setParentState} />

            <div className="fechas">
                <span>Fecha inicio:</span>
                <input type="date"
                    defaultValue={stringHoy}
                    min={stringHoy}
                    onChange={e => {
                        this.props.setParentState({
                            fecha_inicio: e.target.value
                        });
                    }}
                />

                <span>Fecha fin:</span>
                <input type="date"
                    defaultValue={stringHoy}
                    min={stringHoy}
                    onChange={e => {
                        this.props.setParentState({
                            fecha_fin: e.target.value
                        })
                    }}
                />
            </div>

            <div className="ancho">
                {this.props.children}
            </div>
        </div>
    }
}

class MenuReservas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habitacionesDisponibles: [],
            hab_elegida: null
        };
    }

    render() {
        return <div className="reservas">
            <PasoRequerimientos
                fecha_inicio = { this.state.fecha_inicio }
                fecha_fin = { this.state.fecha_fin }
                setParentState = { state => this.setState(state) }
            >
                <button className="bonito" onClick= {() => this.queryHabitaciones() } >Buscar</button>
            </PasoRequerimientos>

            <DisplayHabitaciones
                lista_hab={this.state.habitacionesDisponibles}
                hab_elegida = {this.state.hab_elegida}
                msg={this.state.msg}
                set_habitacion={hab => 
                    this.setState({hab_elegida: hab})
                }
            />

            { this.state.hab_elegida
                ? <DatosPersonales func_confirmar={(...args) => this.confirmar_reserva(...args)} />
                : null }
        </div>
    }

    // Pide habitaciones disponibles para la gente dada en los días dados
    // Usa GET hacia la api
    queryHabitaciones() {
        // Verificación de fechas
        if (new Date(this.state.fecha_fin) - new Date(this.state.fecha_inicio) < 0) {
            this.setState({
                msg: "Su fecha final es antes de la fecha inicial",
                habitacionesDisponibles: [],
                id_hab_elegida: null
            });
            return;
        }

        let getParams = [
            "num_adults=" + this.state.adultos_num,
            "num_children=" + this.state.ninos_num,
            "start_date=" + this.state.fecha_inicio,
            "end_date=" + this.state.fecha_fin
        ]

        fetch(`api/habitaciones/listar-habitaciones-filtro?${getParams.join("&")}`)
        .then(datos => datos.json())
        .then(datos => {
            this.setState({
                msg: "No hay habitaciones que cumplan con su criterio",
                habitacionesDisponibles: datos,
                id_hab_elegida: null
            })
        });
    }

    confirmar_reserva(datos_personales) {
        console.log(datos_personales);
        if ((datos_personales.nombre
            && datos_personales.apellido
            && datos_personales.email
            && datos_personales.telefono) == false)
                return alert("Error: Campo vacío");

        // Datos del POST pero aaaa
        let datos = new Object();
        datos.client_data = {
            first_name: datos_personales.nombre,
            last_name: datos_personales.apellido,
            rut: datos_personales.rut,
            email: datos_personales.email,
            phone: datos_personales.telefono
        }
        // Calcular dias de estadía
        const milSecPerDay = 86400000;
        let dias = (new Date(this.state.fecha_fin) - new Date(this.state.fecha_inicio));
        dias /= milSecPerDay;
        dias += 1;
        datos.booking = {
            start_date: this.state.fecha_inicio,
            end_date: this.state.fecha_fin,
            num_adults: this.state.adultos_num,
            num_children: this.state.ninos_num,
            total_price: this.state.hab_elegida.price * dias,
            status: "Confirmada"
        }
        datos.booking_room_detail = [{
            room: this.state.hab_elegida.id,
            num_adults: this.state.hab_elegida.num_adults,
            num_children: this.state.hab_elegida.num_children,
            specific_price: this.state.hab_elegida.price
        }];

        console.log(datos);
        fetch("api/reservas/crear-reserva", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: datos
        })
        .then(a => a.json())
        .then(a => console.log(a));
    }
}

const domContainer = document.querySelector("#seccion_dinamica");
ReactDOM.render(React.createElement(MenuReservas), domContainer);