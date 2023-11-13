'use strict';

// Muestra el mes, año, y flechas para cambiar de mes
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function MesCalendario(props) {
  return <div className = "nombre-mes">
      <button onClick={props.onClickIzq}>&lt;</button>
          { meses[props.mes % 12] } {props.anno}
      <button onClick={props.onClickDer}>&gt;</button>
  </div>;
}

// solo muestra los dias de la semana
const dias_semana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
function SemanaCalendario(props) {
  return <React.Fragment>
    { dias_semana.map( dia => <div className = "nombre-dia" key={dia}>{dia}</div> ) }
  </React.Fragment>
}

// Muestra una sola fecha, entregada en props como "fecha"
// recibe una función onClickFecha(fecha) que usa el número que muestra como argumento
// recibe clasesExtra, que debería ser un string con el formato de className
function FechaCalendario(props) {
  let clase = "fecha";
  if (props.clasesExtra) clase += " " + props.clasesExtra;

  return <div
    className={clase}
    onClick={props.onClickFecha ? e => props.onClickFecha(props.fecha) : null}
  >
    {props.fecha}
  </div>
}

// Llena el calendario de fechas
// Necesita recibir anno y mes por props, con el formato de
// Date.getFullYear() y Date.getMonth()
function FechasCalendario(props) {
  // Encontrando el primer dia del mes...
  let primer_dia = new Date(props.anno, props.mes, 1);
  // Se calcula su dia de la semana...
  let dia_semana = (primer_dia.getDay() + 6) % 7;
  // para encontrar el primer dia de su semana, donde se empieza a iterar
  let dia_iter = new Date(primer_dia);
  dia_iter.setDate(primer_dia.getDate() - dia_semana);
  // Luego se calcula el último dia del mes, porque se iterará hasta llegar
  // a un lunes después de ese dia
  let ultimo_dia = new Date(props.anno, props.mes + 1, 0);

  // Array que contendrá un número de fecha, o -1 si la fecha cae fuera del mes
  // Luego se mapeará a FechaCalendario
  let dias_del_mes = [];
  // El loop se detiene el primer lunes del próximo mes
  while (dia_iter.getDay() != 1 || dia_iter <= ultimo_dia) {
    if (dia_iter.getMonth() == props.mes)
      dias_del_mes.push(dia_iter.getDate());
    else dias_del_mes.push(-1);

    dia_iter.setDate(dia_iter.getDate() + 1);
  }

  // variable para asignarle keys a los dias sin fecha escrita
  let deact = 0;
  return <React.Fragment>
  {
    dias_del_mes.map(fecha => {
      // Si la fecha no está en el mes, va deshabilitada
      if (fecha < 0) {
          return <FechaCalendario
            clasesExtra = "desactivada"
            key = {"deact-" + (deact++).toString()}
          />
      }
      // Fecha seleccionable
      else {
        return <FechaCalendario
          fecha={fecha}
          onClickFecha={props.onClickFecha}
          key={fecha.toString()}
        />;
      }
    })
  }
  </React.Fragment>;
}


// El objeto en si
// Acepta una funcion onClickFecha(anno, mes, dia)
// que se ejecuta cuando el usuario
// hace click en una fecha valida
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
      <div className="calendario">
        <MesCalendario
          mes={this.state.mes}
          anno={this.state.anno}
          onClickIzq={() => this.previoMes()}
          onClickDer={() => this.siguienteMes()}
        />
        
        <SemanaCalendario />
    
        <FechasCalendario
          anno={this.state.anno}
          mes={this.state.mes}
          onClickFecha = { dia =>
            this.props.onClickFecha(this.state.anno, this.state.mes, dia)
          }
        />
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
    let ahora = new Date();
    // No se puede ir a meses anteriores, obviamente
    if (ahora.getMonth() == this.state.mes && ahora.getFullYear() == this.state.anno) return;
  
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