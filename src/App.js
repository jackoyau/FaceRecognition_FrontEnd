import React, { Component } from 'react';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';

// Move the api key and the api call below to backend for security
// ppl cannot get it from request header now
// const app = new Clarifai.App({
//   apiKey: "ae5c55737d0d43e0b9a8aac41ae1918e",
//  });

const particlesOptions = {
  particles: {
    number:{
      value: 150,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  user:{
    id:'',
    name:'',
    email:'',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }


  loadUser = (data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  faceBoxLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const location = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
    this.setState({box : location});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    if (!this.state.input.includes('.jpg'&&'https'&&'.com')){
      return console.log('error')
    }
    this.setState({imageUrl: this.state.input});
    fetch('https://polar-shore-16336.herokuapp.com/imageurl',{  // the api call moved to backend
         method:'post',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify({
           input: this.state.input
         })
    })
    .then(response => response.json())
    .then(response => {
      if(!response.outputs[0].data.regions){
        return console.log('error');
      }
       fetch('https://polar-shore-16336.herokuapp.com/image',{
         method:'put',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify({
           id: this.state.user.id
         })
       })
        .then(response=>response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{ entries: count }))
        })
        .catch(console.log)
        this.faceBoxLocation(response);
    })
   .catch((err) => {
    console.log(err);
   });
   };   
   
   onRouteChange = (route) => {
     this.setState({route : route});
     if(route === 'signin'){
       this.setState(initialState);
     }
   }

  render(){
    return(
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />

       <Navigation onRouteChange={this.onRouteChange} routeState={this.state.route} /> 
        
        {/* { this.state.route === 'signin' ?
            <Signin onRouteChange={this.onRouteChange} /> */}
           {this.state.route === 'register' ?
            <Register onRouteChange={this.onRouteChange}/>
          : this.state.route === 'home' ?
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div>

          : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
