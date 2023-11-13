'use strict'

function Habitacion(props) {

    let gente = `${props.habitacion.max_adult_capacity} adultos`;
    if (props.habitacion.max_child_capacity > 0) {
        gente += `, ${props.habitacion.max_child_capacity} niño`;
        if (props.habitacion.max_child_capacity > 1) gente += `s`;
    }

    let clase = "habitacion card";
    if (props.hab_elegida && props.habitacion.id == props.hab_elegida.id)
        clase += " elegida";

    return <div className={clase} onClick={() =>
        props.set_habitacion(props.habitacion)
    }>
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
    else if (props.lista_hab.length == 0) return <div className="habitaciones"><b>{props.msg}</b></div>;
    else return <div className="habitaciones container-md"> {
        props.lista_hab.map(hab =>
            <Habitacion
                habitacion={hab} 
                key={hab.name}
                hab_elegida={props.hab_elegida}
                set_habitacion={props.set_habitacion}
            />
        )
    }
    </div>
}