'use strict';

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function CalendarioMes(props) {
  return <div className = "nombre_mes">
      <button onClick={props.onClickIzq}>&lt;</button>
          { meses[props.mes % 12] } {props.anno}
      <button onClick={props.onClickDer}>&gt;</button>
  </div>;
}

const dias_semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function CalendarioSemana(props) {
  return <React.Fragment>
    { dias_semana.map( dia => <div className = "nombre_dia" key={dia}>{dia}</div> ) }
  </React.Fragment>
}

function CalendarioFecha(props) {
  let clase = "fecha";
  if (props.desactivada) clase += " desactivada";
  if (props.seleccionada) clase += " seleccionada";

  return <div
    className={clase}
    onClick={props.func_seleccionar ? () => props.func_seleccionar(props.fecha) : null}
  >
    {props.fecha}
  </div>
}

function CalendarioFechas(props) {
  let mes_actual = props.mes;
  let primer_dia = new Date(props.anno, props.mes, 1);
  let dia_semana = (primer_dia.getDay() + 6) % 7;
  primer_dia.setDate(primer_dia.getDate() - dia_semana);
  let ultimo_dia = new Date(props.anno, props.mes + 1, 0);
  let dia_iter = new Date(primer_dia);

  let dias_del_mes = [];
  // El loop se detiene el primer lunes del próximo mes
  while (dia_iter.getDay() != 1 || dia_iter <= ultimo_dia) {
    if (dia_iter.getMonth() == mes_actual)
      dias_del_mes.push(dia_iter.getDate());
    else dias_del_mes.push(-1);

    dia_iter.setDate(dia_iter.getDate() + 1);
  }

  let deact = 0;
  return <React.Fragment>
  {
    dias_del_mes.map(fecha => {
      // Fecha en el mes?
      if (fecha > 0) {
        // Seleccionada?
        let feeeecha = new Date(props.anno, props.mes, fecha);
        let idx_fecha_seleccionada = props.selecciones.findIndex(f => 
          f.getTime() == feeeecha.getTime()
        );

        // Fecha seleccionable
        if (idx_fecha_seleccionada < 0) {
          return <CalendarioFecha
            fecha={fecha}
            func_seleccionar={props.func_seleccionar}
            key={fecha.toString()}
          />;
        }
        // Fecha seleccionada
        else {
          return <CalendarioFecha
            fecha={fecha}
            func_seleccionar={props.func_seleccionar}
            key={fecha.toString()}
            seleccionada={true}
          />
        }
      }
      // Fecha inseleccionable
      else {
        return <CalendarioFecha
          desactivada={true}
          key = {"deact-" + (deact++).toString()}
        />
      }
    })
  }
  </React.Fragment>;
}

class Calendario extends React.Component {
  constructor(props) {
    super(props);
    let ahora = new Date();
    this.state = {
      anno: ahora.getFullYear(),
      mes: ahora.getMonth()
    };
  }

  render() {
    return <React.Fragment>
      <div className="calendario container-sm">
        <CalendarioMes
          mes={this.state.mes}
          anno={this.state.anno}
          onClickIzq={() => this.previoMes()}
          onClickDer={() => this.siguienteMes()}
        />
        
        <CalendarioSemana />
    
        <CalendarioFechas
          anno={this.state.anno}
          mes={this.state.mes}
          selecciones={this.props.fechas_seleccionadas}
          disponibles={this.props.disponibles}
          func_seleccionar={fecha => this.seleccionar(fecha)}
        />
      </div>
      <div>
        <ul>
          { this.props.fechas_seleccionadas.map(fecha =>
            <li key={fecha.toString()}>{fecha.toString()}</li>
          )}
        </ul>
      </div>
    </React.Fragment>
  }

  siguienteMes() {
    let nuevoMes = this.state.mes += 1;
    let nuevoAnno = this.state.anno;
    if (nuevoMes > 11) {
      nuevoMes -= 12;
      nuevoAnno += 1;
    }
    this.setState({anno: nuevoAnno, mes: nuevoMes});
  }

  previoMes() {
    let nuevoMes = this.state.mes -= 1;
    let nuevoAnno = this.state.anno;
    if (nuevoMes < 0) {
      nuevoMes += 12;
      nuevoAnno -= 1;
    }
    this.setState({anno: nuevoAnno, mes: nuevoMes});
  }

  seleccionar(fecha) {
    let nueva_fecha = new Date(this.state.anno, this.state.mes, fecha);
    let nuevas_fechas = this.props.fechas_seleccionadas;

    let idx_fecha = nuevas_fechas.findIndex(fe => fe.getTime() == nueva_fecha.getTime());    
    if (idx_fecha < 0) nuevas_fechas.push(nueva_fecha);
    else nuevas_fechas.splice(idx_fecha, 1);

    nuevas_fechas = nuevas_fechas.sort((a, b) => a - b);
    this.props.setParentState({fechas_seleccionadas: nuevas_fechas});
  }
}