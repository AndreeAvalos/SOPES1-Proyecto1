import React, {Component} from 'react';
import Graficas from './components/Graficas';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

const URLA = process.env.UA|"localhost";
const URLB = process.env.UB|"localhost";

export default class App extends Component{

    constructor(props){
        super(props);
        this.contador = 0;
        this.state = {
            arregloRamA : [0,0,0,0,0],
            arregloRamB : [0,0,0,0,0],
            arregloCpuA : [0,0,0,0,0],
            arregloCpuB : [0,0,0,0,0]
        }
        
    }
    async USAGE_RAMA(){
        var url = "http://"+URLA+":3000"+"/get/ram"
        var response = await fetch(url);
        var data = await response.text();
        var segmentos = data.split("|");
        var usage = segmentos[2].split(":");
        var ram = usage[1].split(" ");
        var arregloRamA1 = this.state.arregloRamA;
        arregloRamA1[4] = arregloRamA1[3];
        arregloRamA1[3] = arregloRamA1[2];
        arregloRamA1[2] = arregloRamA1[1];
        arregloRamA1[1] = arregloRamA1[0];
        arregloRamA1[0] = parseInt(ram[1], 10);
        var result = arregloRamA1.map((arregloRamA1)=>arregloRamA1*1);
        this.setState({arregloRamA:result });
        //console.log(arregloRamA1);        
    }
    async USAGE_CPUA(){
        var url = "http://"+URLA+":3000"+"/get/cpu"
        var response = await fetch(url);
        var data = await response.text();
        var usage = data.split(":");
        var cpu = usage[1].split("%");
        var arregloCpu = this.state.arregloCpuA;
        arregloCpu[4] = arregloCpu[3];
        arregloCpu[3] = arregloCpu[2];
        arregloCpu[2] = arregloCpu[1];
        arregloCpu[1] = arregloCpu[0];
        arregloCpu[0] = parseInt(cpu[0], 10);
        var result = arregloCpu.map((arregloCpu)=>arregloCpu*1);
        this.setState({arregloCpuA:result });
        console.log(result);        
    }
    async USAGE_RAMB(){
        var url = "http://"+URLB+":3000"+"/get/ram"
        var response = await fetch(url);
        var data = await response.text();
        var segmentos = data.split("|");
        var usage = segmentos[2].split(":");
        var ram = usage[1].split(" ");
        var arregloRamA1 = this.state.arregloRamA;
        arregloRamA1[4] = arregloRamA1[3];
        arregloRamA1[3] = arregloRamA1[2];
        arregloRamA1[2] = arregloRamA1[1];
        arregloRamA1[1] = arregloRamA1[0];
        arregloRamA1[0] = parseInt(ram[1], 10);
        var result = arregloRamA1.map((arregloRamA1)=>arregloRamA1*1);
        this.setState({arregloRamB:result });
        //console.log(arregloRamA1);        
    }
    async USAGE_CPUB(){
        var url = "http://"+URLB+":3000"+"/get/cpu"
        var response = await fetch(url);
        var data = await response.text();
        var usage = data.split(":");
        var cpu = usage[1].split("%");
        var arregloCpu = this.state.arregloCpuA;
        arregloCpu[4] = arregloCpu[3];
        arregloCpu[3] = arregloCpu[2];
        arregloCpu[2] = arregloCpu[1];
        arregloCpu[1] = arregloCpu[0];
        arregloCpu[0] = parseInt(cpu[0], 10);
        var result = arregloCpu.map((arregloCpu)=>arregloCpu*1);
        this.setState({arregloCpuB:result });
        console.log(result);        
    }
    componentWillMount(){
        setInterval(() => {
            this.USAGE_RAMA();
            this.USAGE_CPUA();
            this.USAGE_RAMB();
            this.USAGE_CPUB();
        }, 5000);
    }

    render(){
        return(
            <Router>
                <div className="App">
                    <Switch>
                        <Route path= "/charts">
                            <Graficas arregloRamA={this.state.arregloRamA} arregloRamB = {this.state.arregloRamB} arregloCpuA = {this.state.arregloCpuA} arregloCpuB = {this.state.arregloCpuB} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}