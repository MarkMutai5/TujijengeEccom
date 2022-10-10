
import React, {createContext} from 'react'
import {auth} from '../Components/config/firebaseConfig'

export const UserContext = createContext()

export class UserContextProvider extends React.Component{

    state = {
        currentUser: {}
    }
   
    componentDidMount(){

        //const uid = this.state.currentUser
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState(user)
            }
            else{
                this.setState(null)
            }
        })
    }

    render(){
        return(
            <UserContext.Provider value = {{currentUser: [this.state.currentUser]}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}