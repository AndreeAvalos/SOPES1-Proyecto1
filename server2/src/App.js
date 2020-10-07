import React, {Component} from 'react';
import Graficas from './components/Graficas';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


export default class App extends Component{

    constructor(props){
        super(props);
        this.urla = "34.122.196.15";
        this.urlb = "35.225.228.8";
        this.state = {
            arregloRamA : [0,0,0,0,0],
            arregloRamB : [0,0,0,0,0],
            arregloCpuA : [0,0,0,0,0],
            arregloCpuB : [0,0,0,0,0],
            ramA:0,
            ramB:0,
            cpuA:0,
            cpuB:0
        }
        
    }
    async USAGE_RAMA(){
        var url = "http://"+this.urla+":3000"+"/get/ram"
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
        this.setState({arregloRamA:result, ramA: arregloRamA1[0]});

        console.log("RAM A",result);        
    }
    async USAGE_CPUA(){
        var url = "http://"+this.urla+":3000"+"/get/cpu"
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
        this.setState({arregloCpuA:result, cpuA:arregloCpu[0] });
        //console.log(result);        
    }
    async USAGE_RAMB(){
        var url = "http://"+this.urlb+":3000"+"/get/ram"
        var response = await fetch(url);
        var data = await response.text();
        var segmentos = data.split("|");
        var usage = segmentos[2].split(":");
        var ram = usage[1].split(" ");
        var arregloRamA1 = this.state.arregloRamB;
        arregloRamA1[4] = arregloRamA1[3];
        arregloRamA1[3] = arregloRamA1[2];
        arregloRamA1[2] = arregloRamA1[1];
        arregloRamA1[1] = arregloRamA1[0];
        arregloRamA1[0] = parseInt(ram[1], 10);
        var result = arregloRamA1.map((arregloRamA1)=>arregloRamA1*1);
        this.setState({arregloRamB:result, ramB:arregloRamA1[0]});
        console.log("RAM B:",result);        
    }
    async USAGE_CPUB(){
        var url = "http://"+this.urlb+":3000"+"/get/cpu"
        var response = await fetch(url);
        var data = await response.text();
        var usage = data.split(":");
        var cpu = usage[1].split("%");
        var arregloCpu = this.state.arregloCpuB;
        arregloCpu[4] = arregloCpu[3];
        arregloCpu[3] = arregloCpu[2];
        arregloCpu[2] = arregloCpu[1];
        arregloCpu[1] = arregloCpu[0];
        arregloCpu[0] = parseInt(cpu[0], 10);
        var result = arregloCpu.map((arregloCpu)=>arregloCpu*1);
        this.setState({arregloCpuB:result, cpuB: arregloCpu[0] });
        //console.log(result);        
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
                            <Graficas   ramA={this.state.ramA} ramB={this.state.ramB} cpuA={this.state.cpuA} cpuB={this.state.cpuB}
                                        arregloRamA={this.state.arregloRamA} arregloRamB = {this.state.arregloRamB} arregloCpuA = {this.state.arregloCpuA} arregloCpuB = {this.state.arregloCpuB} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}