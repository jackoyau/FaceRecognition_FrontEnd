import React from 'react';

// const Register = ({ onRouteChange }) => {
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password: '',
            name: '',
            registerFail: false
        }
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value})
    }

    onEmailChange=(event)=>{
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () => {
        fetch("https://polar-shore-16336.herokuapp.com/register",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.email,
                password:this.state.password,
                name:this.state.name
            })
        })
            .then(response=>response.json())
            .then(user=>{
                if(user.id){//checked in server, check user.id, becuz if the return is object user, it contains user.id !! If return error msg, no user.id
                this.props.onRouteChange('signin'); 
                } else {
                    this.setState({registerFail : true});
                }
            }) 
    }

    render(){
        // const { onRouteChange } = this.props;
        return(
            <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Join AI Detection</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba b--white bg-transparent hover-bg-white hover-white" 
                                    type="text"
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba b--white bg-transparent hover-bg-white hover-white" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba b--white bg-transparent hover-bg-white hover-white" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitRegister}
                                // onClick={() => onRouteChange('signin')} 
                                //when u pass an argument "home", the function gets executed when rendering "onRouteChange('home')"
                                //Now, you want to define the function and not to call it.
                                // *** Define in Rendering, Call when clicked !
                                //So you should use arrow function to assign it to the onClick event
                                className="b ph3 pv2 input-reset ba b--white br2 bg-transparent grow pointer f6 dib white" 
                                type="submit"
                                value="Register"
                            />
                        </div>
                        {this.state.registerFail  ?
                        <p className="dark-red f6 mb0">Please check your input </p>
                        :null
                        }
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;