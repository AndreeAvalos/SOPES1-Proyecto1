import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';

class Graficas extends Component{
    constructor(props){
        super(props);
        this.state = {
            ram: {
                    labels:["Estado 1","Estado 2","Estado 3","Estado 4","Estado 5"],
                    datasets:[
                        {
                            label: "Ram Servidor A",
                            backgroundColor:"rgba(31,96,236,0.75)",
                            data: [0]
                        },
                        {
                            label: "Ram Servidor B",
                            backgroundColor:"rgba(65,236,31,0.75)",
                            data:[0]
                        },
                        {
                            label: "Ram BASE",
                            backgroundColor:"rgba(0,0,0,0.75)",
                            data:[0,0,0,0,0]
                        }
                    
                    ]
            },
            cpu :{
                    labels:["Estado 1","Estado 2","Estado 3","Estado 4","Estado 5"],
                    datasets:[
                        {
                            label: "CPU Servidor A",
                            backgroundColor:"rgba(72,5,182,0.75)",
                            data:[0]
                        },
                        {
                            label: "CPU Servidor B",
                            backgroundColor:"rgba(0,0,255,0.75)",
                            data:[0]
                        }
                    ]
            }
        }
    }
    render(){

        this.state.ram.datasets[0].data = this.props.arregloRamA;
        this.state.ram.datasets[1].data = this.props.arregloRamB;
        this.state.cpu.datasets[0].data = this.props.arregloCpuA;
        this.state.cpu.datasets[1].data = this.props.arregloCpuB;
        return(
            <div>
                <h1>Grafica</h1>
                <div style={{position:"relative",width: 500, height:500}}>
                    <h3>USO DE RAM</h3>
                    <Line
                    options = {{
                        responsive:true
                    }}
                    data ={this.state.ram}
                    />
                    <h5>RAM A: {this.props.ramA}%       RAM B: {this.props.ramB}%</h5>
                    <h3>USO DE CPU</h3>
                    <Line
                    options = {{
                        responsive:true
                    }}
                    data ={this.state.cpu}
                    />
                    <h5>CPU A: {this.props.cpuA}%       CPU B: {this.props.cpuB}%</h5>
                </div>
            </div>
        )
    }
}

export default Graficas