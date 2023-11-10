'use strict'

class ContadorPersonas extends React.Component {
    constructor(props) {
        super(props);
        this.actualizarNums = this.actualizarNums.bind(this);
        this.props.setParentState({
            adultos_num: this.props.adultos_min,
            ninos_num: this.props.ninos_min,
        })
    }

    render() {
        let vals_adultos = [];
        let i_adultos = this.props.adultos_min;
        while (i_adultos <= this.props.adultos_max)
            vals_adultos.push(i_adultos++);
        let vals_ninos = [];
        let i_ninos = this.props.ninos_min;
        while (i_ninos <= this.props.ninos_max)
            vals_ninos.push(i_ninos++);

        return <div className="contador_personas">
            <select name="adultos_num" onChange={this.actualizarNums}>
                { vals_adultos.map(num => <option key={num}>{num}</option>)}
            </select>
            <select name="ninos_num" onChange={this.actualizarNums}>
                { vals_ninos.map(num => <option key={num}>{num}</option>)}
            </select>
        </div>
    }

    actualizarNums(e) {
        let newState = new Object();
        newState[e.target.name] = e.target.value;
        this.props.setParentState(newState);
    }
}

ContadorPersonas.defaultProps = {
    adultos_max: 2,
    adultos_min: 1,
    ninos_max: 2,
    ninos_min: 0,
}