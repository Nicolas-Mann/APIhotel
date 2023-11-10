'use strict'

function Habitacion(props) {

    let gente = `${props.habitacion.max_adult_capacity} adultos`;
    if (props.habitacion.max_child_capacity > 0) {
        gente += `, ${props.habitacion.max_child_capacity} niño`;
        if (props.habitacion.max_child_capacity > 1) gente += `s`;
    }

    return <div className="habitacion card">
        <img className="card-img-top" src={props.habitacion.image} />
        <div className="card-body">
            <div className="card-title">{props.habitacion.name}</div>
            <p className="card-text">{ gente }</p>
            Precio: CLP { props.habitacion.price }
        </div>
    </div>
}

function DisplayHabitaciones(props) {
    if (props.lista_hab === undefined) return <React.Fragment />;
    else if (!props.lista_hab) return <b>No hay habitaciones disponibles.</b>;
    else return <div className="habitaciones container-md"> {
        props.lista_hab.map(
            hab => <Habitacion habitacion={hab}  key={hab.name}/>
        )
    }
    </div>
}