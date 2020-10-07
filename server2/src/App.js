import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import { render } from 'react-dom';
const URLA = process.env.UA;
const URLB = process.env.UB;

export default class App extends Component{

    constructor(props){
        super(props);
        this.arregloRamA = [0,0,0,0,0];
        this.arregloRamB = [0,0,0,0,0];
        this.arregloCpuA = [0,0,0,0,0];
        this.arregloCpuB = [0,0,0,0,0];
        this.state = {
            data:{
                labels:["Estado 1","Estado 2","Estado 3","Estado 4","Estado 5"],
                datasets:[
                    {
                        label: "Ram Servidor A",
                        backgroundColor:"rgba(255,0,255,0.75)",
                        data: [0]
                    },
                    {
                        label: "Ram Servidor B",
                        backgroundColor:"rgba(0,0,255,0.75)",
                        data:[0]
                    }
                ]
            }
        }
        this.cpu = {
            data:{
                labels:["Estado 1","Estado 2","Estado 3"],
                datasets:[
                    {
                        label: "CPU Servidor A",
                        backgroundColor:"rgba(255,0,255,0.75)",
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
    async USAGE_RAMA(){
        var url = "http://localhost:3001"+"/get/ram"
        var response = await fetch(url);
        var data = await response.text();
        var segmentos = data.split("|");
        var usage = segmentos[2].split(":");
        var ram = usage[1].split(" ");
        this.arregloCpuA[4] = this.arregloCpuA[3];
        this.arregloCpuA[3] = this.arregloCpuA[2];
        this.arregloCpuA[2] = this.arregloCpuA[1];
        this.arregloCpuA[1] = this.arregloCpuA[0];
        this.arregloCpuA[0] = parseInt(ram[1], 10);
        
    }

    componentWillMount(){
        setInterval(() => {
            this.USAGE_RAMA();
        }, 5000);
    }

    render(){
        this.state.data.datasets[0].data = this.arregloCpuA;
        console.log(this.state.data.datasets[0].data);
        return(
            <div style={{position:"relative",width: 600, height:600}}>
                <h3>USO DE RAM</h3>
                <Line
                options = {{
                    responsive:true
                }}
                data ={this.state.data}
                />
                <h3>USO DE CPU</h3>
                <Line
                options = {{
                    responsive:true
                }}
                data ={this.cpu.data}
                />
            </div>
            
        )
    }
}