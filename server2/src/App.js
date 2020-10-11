import React, {Component} from 'react';
import Graficas from './components/Graficas';
import Datos from './components/Datos'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar';

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
            cpuB:0,
            DatosA: [{"autor":"Andree", "nota":"Bienvenidos a Publicaciones A"}],
            DatosB: [{"autor":"Andree", "nota":"Bienvenidos a Publicaciones B"}]
        }
        
    }

    async USAGE_RAMA(){
        var url = "http://".concat(this.urla,":3000","/get/ram")
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
        var url = "http://".concat(this.urla,":3000","/get/cpu")
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
        var url = "http://".concat(this.urlb,":3000","/get/ram")
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
        var url = "http://".concat(this.urlb,":3000","/get/cpu")
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

    async GETDATOSA(){
        var url = "http://".concat(this.urla,":3000","/get/collection")
        var response = await fetch(url);
        var data = await response.json();
        this.setState({DatosA:data})
    }
    
    async GETDATOSB(){
        var url = "http://".concat(this.urlb,":3000","/get/collection")
        var response = await fetch(url);
        var data = await response.json();
        this.setState({DatosB:data})
    }

    componentWillMount(){
        setInterval(() => {
            this.USAGE_RAMA();
            this.USAGE_CPUA();
            this.USAGE_RAMB();
            this.USAGE_CPUB();
            this.GETDATOSA();
            this.GETDATOSB();
        }, 5000);
    }

    render(){
        return(
            <Router>
                <div className="App">
                    <Navbar >
                    </Navbar>
                    <Switch>
                        <Route path= "/charts">
                            <Graficas   ramA={this.state.ramA} ramB={this.state.ramB} cpuA={this.state.cpuA} cpuB={this.state.cpuB}
                                        arregloRamA={this.state.arregloRamA} arregloRamB = {this.state.arregloRamB} arregloCpuA = {this.state.arregloCpuA} arregloCpuB = {this.state.arregloCpuB} />
                        </Route>
                        <Route path="/dataA">
                            <Datos data={this.state.DatosA} name="A"/>
                        </Route>
                        <Route path="/dataB">
                            <Datos data={this.state.DatosB} name="B"/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}