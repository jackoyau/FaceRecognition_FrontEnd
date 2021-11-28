import React from 'react';

// const Signin = ({ onRouteChange }) => {
class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail:'',
            signInPassword: '',
            signInFail: false
        }
    }
    onEmailChange=(event)=>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = (event) => {
        // event.preventDefault();  // becuz we are not using <div> but form
        fetch("https://polar-shore-16336.herokuapp.com/signin",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
            .then(response=>response.json())
            .then(user=>{
                if(user.id){ //checked in server, check user.id, becuz if the return is object user, it contains user.id !! If return error msg, no user.id
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({signInFail : true});
                }
            })  
    }

    render(){
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-50-l mw6 shadow-5 center">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">AI Face Detection</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba b--white bg-transparent hover-bg-white hover-black " 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba b--white bg-transparent hover-bg-white hover-black" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}    
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                // onClick={() => onRouteChange('home')} 
                                //when u pass an argument "home", the function gets executed when rendering "onRouteChange('home')"
                                //Now, you want to define the function and not to call it.
                                // *** Define in Rendering, Call when clicked !
                                //So you should use arrow function to assign it to the onClick event
                                className="b ph3 pv2 input-reset ba b--white br2 bg-transparent pointer f5.5 dib grow white" 
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim white db pointer underline">Register</p>
                        </div>
                        {this.state.signInFail  ?
                        <p className="dark-red f6 mb0">Incorrect Email or Password </p>
                        :null
                        }
                    </div>
                </main>
            </article>
        );
    }
}


export default Signin;